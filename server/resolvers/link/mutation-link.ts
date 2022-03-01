import * as jwt from 'jsonwebtoken';
import { Context } from '../../context';
import { JWT_TOKEN_SIGNATURE } from '../../config/keys';
import { encryptAes256cbc } from '../../services/encryption';
import { getHoursUntil } from '../../util/dateAndTime/time-until-date';
import { IcreateMessageLinkOutput, IcreateSignalLinkOutput, IDeleteLinkOutput } from '../../util/typings';
import options from '../../config/options';

const LinkMutation = {
  async createMessageLink(parent, args, ctx: Context): Promise<IcreateMessageLinkOutput> {
    try {
      // parent can be used in case called by Message query
      const payLoad = args.data;

      const { prisma } = ctx;

      let timeUntilExpiry: null | number = null;

      // set the expiry in hour format, calculated
      if (payLoad?.expiry) {
        timeUntilExpiry = getHoursUntil(payLoad.expiry);
      }

      // if not given, set default value, 3 hours
      const expiryInformation = {
        expiresIn: payLoad?.expiry ? `${timeUntilExpiry}h` : '3h',
      };

      /**
       * the token contains the expiry time (if given) and
       * the messageID which the link is connected to also, by default the expiry
       * is set to 3 hours
       */
      const token = jwt.sign(payLoad, JWT_TOKEN_SIGNATURE, expiryInformation);

      const { IV, encrypted } = encryptAes256cbc(token);

      await prisma.link.create({
        data: {
          message: { connect: { id: payLoad.messageId } },
          expiry: new Date(payLoad?.expiry) ?? null,
          content: `${encrypted}_IV_${IV}`,
        },
      });

      // link contains message ID, expiry
      return {
        content: `${options.server.protocol}://${options.server.host}/public/link/${encrypted}_IV_${IV}`,
        expiry: payLoad?.expiry ?? null,
      };
    } catch (error) {
      return error;
    }
  },

  // create a one time signal link that cannot be used again
  async createSignalLink(parent, args): Promise<IcreateSignalLinkOutput> {
    const { key, signalId } = args?.data;

    if (!key) {
      throw new Error('key is missing');
    }

    if (!signalId) {
      throw new Error('signalId is missing');
    }

    return {
      content: `${options.app.domain}/reveal/${signalId}/${key}`,
    };
  },

  /**
   * @description deletes a link from the database, based on the ID
   */
  async deleteLink(parent, args, ctx: Context): Promise<IDeleteLinkOutput> {
    try {
      // get link ID
      const { data } = args;

      const { prisma } = ctx;

      // delete link from DB
      const link = await prisma.link.delete({ where: { id: data.id } });

      if (!link) {
        throw new Error('Link could not be deleted');
      }

      return { data: link.id, expiry: link?.expiry ?? null };
    } catch (error) {
      return error;
    }
  },
};

export { LinkMutation };
