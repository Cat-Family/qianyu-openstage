import React from 'react';
import { ContextModalProps } from '@mantine/modals';
import Settings from '../components/Settings/Settings';

const SettingsModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => (
  <Settings context={context} id={id} innerProps={innerProps} />
);

export default SettingsModal;
