import React from 'react';

import { useCreateSecretFormState } from '../../../../store/store';
import { FlexGridEqual } from '~/components/layout/grids/FlexGrid';
import { FlexGridItem } from '~/components/layout/grids/FlexGridItem';
import RadioButton from '../inputs/RadioButton';

const HorizontalToggle = () => {
  const { selection, setSelection } = useCreateSecretFormState((state) => ({
    selection: state.selection,
    setSelection: state.setSelection,
  }));

  return (
    <FlexGridEqual gap="2rem">
      <FlexGridItem alignSelf="stretch" flex="1">
        <RadioButton label="Create Signal" onClick={() => setSelection('signal')} checked={selection === 'signal'} />
      </FlexGridItem>

      <FlexGridItem alignSelf="stretch" flex="1">
        <RadioButton label="Create Message (soon)" onClick={() => null} checked={selection === 'message'} />
      </FlexGridItem>
    </FlexGridEqual>
  );
};

export default HorizontalToggle;
