import React, { useState } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';
import { useMutation } from '@apollo/client';

import { DisplayLink } from '../../signals/DisplayLink';
import { Alert } from '../alert/Alert';
import { ButtonWrapper } from '../buttons/ButtonWrapper';
import { TextArea } from './inputs/TextArea';
import TextInput from './inputs/TextInput';
import { Loader } from '../loaders/Loader';

import { FlexGridItem } from '~/components/layout/grids/FlexGridItem';
import { FlexGridEqual } from '~/components/layout/grids/FlexGrid';
import { CREATE_PUBLIC_SIGNAL } from '~/graphql/mutations/signal/mutation-create-public-signal';
import { useCreateSecretFormState, useSignalState } from '~/store/store';
import { MessageTypes } from '~/types/enums';

const CreatePublicSignal = () => {
	// State
	const formState = useCreateSecretFormState(
		(state) => ({
			setLink: state.setLink,
			setContent: state.setContent,
			setTitle: state.setTitle,
			content: state.content,
			title: state.title,
			link: state.link,
		}),
		shallow,
	);

	const signalState = useSignalState((state) => ({ setLinkCopied: state.setLinkCopied }), shallow);

	const [alert, setAlert] = useState({
		type: MessageTypes.INFO,
		message: '',
	});


	// Hooks
	const [createSignalMutation, { loading = false }] = useMutation(CREATE_PUBLIC_SIGNAL, {
		onCompleted: ({ createPublicSignal }) => {
			formState.setLink(createPublicSignal?.link?.content);
			formState.setContent('');
			formState.setTitle('');
			signalState.setLinkCopied(false);
			setAlert({ type: MessageTypes.INFO, message: '' });
		},
		onError: (error) => {
			setAlert({ type: MessageTypes.ERROR, message: error.message });
			signalState.setLinkCopied(false);
		},
	});


	// Handlers
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		if (!formState.title || !formState.content) {
			setAlert({ type: MessageTypes.ERROR, message: 'Please fill in all fields' });

			return;
		}

		createSignalMutation({
			variables: {
				title: formState.title,
				content: formState.content,
			},
		});
	};


	// Determine content
	return (
		<Wrapper>
			<FlexGridEqual gap='1.5rem' justifyContent='stretch'>
				<FlexGridItem alignSelf='stretch' flex='1'>
					<TextInput
						label='Enter a title for your secret...'
						name='title'
						value={formState.title}
						onChange={(e) => formState.setTitle(e.target.value)}
					/>
				</FlexGridItem>
			</FlexGridEqual>

			<FlexGridEqual gap='1.5rem' justifyContent='stretch'>
				<TextArea
					label='Enter the message that you want to encrypt...'
					name='content'
					value={formState.content}
					onChange={(e) => formState.setContent(e.target.value)}
				/>
			</FlexGridEqual>

			{!!formState.link && (
				<FlexGridEqual gap='1.5rem' alignItems='center' justifyContent='flex-end'>
					<DisplayLink link={formState.link} />
				</FlexGridEqual>
			)}

			<FlexGridEqual gap='1.5rem' alignItems='center' justifyContent='flex-end'>
				<ButtonWrapper>
					<button onClick={(e) => handleSubmit(e)}>Encrypt</button>
				</ButtonWrapper>
			</FlexGridEqual>

			<Loader loading={loading} />
			{alert.message && <Alert message={alert.message} type={alert.type} />}
		</Wrapper>
	);
};

// --- Styled components ---

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h4 {
    font-weight: 400;
    margin: 0 0.5rem;
  }

  p {
    font-weight: 300;
  }
`;

export default CreatePublicSignal;
