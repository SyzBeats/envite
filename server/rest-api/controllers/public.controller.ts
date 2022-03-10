import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as keys from '../../config/keys';
import { decryptAes256cbc } from '../../services/encryption';
import { MessageToken } from '../../util/typings';
import { isMessageToken } from '../../util/typings/typeguards';
import { prisma } from '../../lib/prisma';
const router = express.Router({ caseSensitive: false });

/**
 * @GET /public/link/:token
 * @description access for non logged in users to links that
 * they have obtained
 */

router.get('/link/:cipher', async (req, res) => {
  await prisma.$connect();

  try {
    const { cipher } = req.params;

    const token = decryptAes256cbc(cipher);

    const data: MessageToken | object | string = jwt.verify(token, keys.JWT_TOKEN_SIGNATURE);

    if (!isMessageToken(data)) {
      return res.status(500).json({ message: 'something went wrong' });
    }

    const message = await prisma.message.findUnique({
      where: {
        id: data.messageId,
      },
      select: {
        content: true,
        id: true,
        createdAt: true,
      },
    });

    if (!message) {
      throw new Error('The message does not exist');
    }

    // get the Message content
    const decryptedMessage = decryptAes256cbc(message.content);

    return res.status(200).send(decryptedMessage);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went horribly wrong here. We are sorry!',
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

/**
 * @GET /public/signal/:id
 * @description one time signals will be decrypted and destroyed
 */
router.get('/signal/:id', async (req, res) => {
  await prisma.$connect();

  const { id } = req.params;
  const { key } = req.query;

  try {
    // get the secret from the database
    const signal = await prisma.signal.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        id: true,
        createdAt: true,
      },
    });

    if (!signal) {
      throw new Error('The signal does not exist');
    }

    if (typeof key !== 'string') {
      return res.status(409).json({ message: 'The initialization vector is not a string' });
    }

    const message = decryptAes256cbc(signal.content, key?.toString());

    // delete the signal
    await prisma.signal.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went horribly wrong here. We are sorry!',
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

/**
 * @GET /public/publicSignal/:id
 * @description This route is used for signals which have been created via the
 * public feature on the home page. This route is used to decrypt the signal and
 * destroy it afterwards.
 */
router.get('/publicSignal/:id', async (req, res) => {
  await prisma.$connect();

  const { id } = req.params;
  const { key } = req.query;

  try {
    // get the secret from the database
    const signal = await prisma.publicSignal.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    if (!signal) {
      throw new Error('The signal does not exist');
    }

    if (typeof key !== 'string') {
      return res.status(409).json({ message: 'The initialization vector is not a string' });
    }

    const message = decryptAes256cbc(signal.content, key?.toString());

    // delete the signal
    await prisma.publicSignal.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message, title: signal.title });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went horribly wrong here. We are sorry!',
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;