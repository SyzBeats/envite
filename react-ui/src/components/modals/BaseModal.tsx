import React, { useRef } from 'react';
import styled from 'styled-components';
import { useClickaway } from '../../hooks/useClickaway';
import { X } from 'react-feather';

interface ModalProps {
  children: React.ReactNode;
  handler: Function;
}

const BaseModal = ({ handler, children }: ModalProps) => {
  const ref = useRef(null);

  const [callback] = useClickaway(ref, handler);

  return (
    <>
      <Curtain />
      <div ref={ref}>
        <Modal>
          <Container>
            <CloseButton onClick={callback}>
              <X size={30} />
            </CloseButton>
            <ModalContent> {children} </ModalContent>
          </Container>
        </Modal>
      </div>
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  animation: fadeInUp 0.3s ease-in-out forwards;
  padding: 1rem;

  top: 50%;
  left: 50%;
  width: 50vmin;
  height: 50vmin;
  min-width: 20rem;
  min-height: 50vh;

  background: #fff;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.depth_1};
  border-top: 0.5rem solid ${({ theme }) => theme.colors.highlight_iceblue};

  z-index: 10000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.highlight_iceblue};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Curtain = styled.div`
  animation: fadeIn 0.3s ease-in-out forwards;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div``;

export default BaseModal;
