import React from 'react';
import SelectInput from 'ui/components/SelectInput';
import TextInput from 'ui/components/TextInput';

import styles from './Inputs.module.css';

const FUNCTIONALITY = [
  {
    value: 'appName',
    label: 'Application Name',
  },
  {
    value: 'ipAddr',
    label: 'Ip address',
  },
  {
    value: 'URL',
    label: 'URL',
  },
  {
    value: 'CVE',
    label: 'CVE',
  },
  {
    value: 'MD5',
    label: 'MD5',
  },
];

export default function XforceInput({ onChange }) {
  const [functionality, setFunctionality] = React.useState('');
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    onChange([functionality, value]);
  }, [value, functionality, onChange]);
  return (
    <div className={styles.inputsRow}>
      <SelectInput
        caption="Type"
        placeholder="Select type..."
        display="block"
        data={FUNCTIONALITY}
        className={styles.fullWidth}
        onChange={(value) => setFunctionality(value)}
      />
      <TextInput
        caption="Value"
        placeholder="Enter value here..."
        display="block"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
