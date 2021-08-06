import React from 'react';
import SelectInput from 'ui/components/SelectInput';
import TextInput from 'ui/components/TextInput';

import styles from './Inputs.module.css';

const FUNCTIONALITY = [
  {
    value: 'defaultpasswords',
    label: 'Default passwords',
  },
  {
    value: 'maclookup',
    label: 'Mac lookup',
  },
];

const functionalityDescription = {
  defaultpasswords: '"motorola" or "apple"',
  maclookup: '"00:A0:BF" or "00A0BF"',
};

export default function W3dtInput({ onChange }) {
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
        onChange={(v) => setFunctionality(v)}
      />
      <TextInput
        caption="Value"
        placeholder={functionalityDescription[functionality]}
        display="block"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
