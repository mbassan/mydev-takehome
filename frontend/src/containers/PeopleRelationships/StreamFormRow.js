import React from 'react';
import SelectInput from 'ui/components/SelectInput';
import Button from 'ui/components/Button';
import TextInput from 'ui/components/TextInput';
import FormItem from 'ui/components/FormItem';
import Icon from 'ui/components/Icon';
import styles from './StreamCreationForm.module.css';

export default function StreamFormRow({
  inputTypes,
  rowData,
  rowIndex,
  setInput,
  removeInput,
  errorMessages,
}) {
  const [placeholder, setPlaceholder] = React.useState('');
  React.useEffect(() => {
    setPlaceholder(rowData.inputPlaceholder);
  }, [rowData]);
  return (
    <div className={styles.streamFormRow} key={`input-${rowIndex}`}>
      <div className={styles.streamFormCol}>
        <FormItem caption="Type" errorMessage={errorMessages[`inputs[${rowIndex}].type`]}>
          <SelectInput
            placeholder="Select type..."
            display="block"
            data={inputTypes}
            value={rowData.type}
            onChange={(type) => setInput(rowIndex, type)}
            hasError={!!errorMessages[`inputs[${rowIndex}].type`]}
          />
        </FormItem>
      </div>
      <div className={styles.streamFormCol}>
        <FormItem caption="Value" errorMessage={errorMessages[`inputs[${rowIndex}].value`]}>
          {rowData.inputComponent
            ? rowData.inputComponent((value) => setInput(rowIndex, null, value))
            : (
              <TextInput
                placeholder={placeholder}
                display="block"
                value={rowData.value}
                onChange={(e) => setInput(rowIndex, null, e.target.value)}
                hasError={!!errorMessages[`inputs[${rowIndex}].value`]}
              />
            )}
        </FormItem>
      </div>
      <div className={styles.streamFormCol}>
        <Button variant="danger" size="medium" onClick={() => removeInput(rowIndex)} iconButton>
          <Icon variant="primary" type="trash" />
        </Button>
      </div>
    </div>
  );
}
