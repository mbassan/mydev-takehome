import React from 'react';
import PropTypes from 'prop-types';
import QueryBuilder from 'ui/components/QueryBuilder';
import Button from 'ui/components/Button';
import TextInput from 'ui/components/TextInput';
import { CSVToArray } from 'ui/utilities/helpers';
import styles from './TwitterQueryBuilder.module.css';

const FILTERS = [
  {
    value: 'q',
    label: 'Hashtag',
    placeholder: 'Example: hashtag',
    inputComponent: (onChange) => (
      <TextInput
        placeholder="Example: hashtag"
        display="block"
        onChange={(e) => onChange(`#${e.target.value}`)}
      />
    ),
  },
  {
    value: 'geo',
    label: 'Geo',
    placeholder: 'lat,long,radius(0km,0mi)',
  },
];

export default function TwitterQueryBuilder({
  onChange,
}) {
  const inputRef = React.useRef();
  const [queryValue, setQueryValue] = React.useState('');
  const [names, setNames] = React.useState([]);

  React.useEffect(() => {
    onChange([
      queryValue,
      names,
    ]);
  }, [names, queryValue]);

  function openUploadFile() {
    inputRef.current.addEventListener('change', (e) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const { result } = event.target;
        try {
          let allNames = CSVToArray(result);
          allNames = allNames.flat();
          console.log(allNames);
          setNames(allNames);
        } catch (err) {
          console.log(err);
        }
      }; // desired file content
      reader.onerror = (error) => console.log(error);
      reader.readAsText(e.target.files[0]); // you could also read images and other binaries
    });
    inputRef.current.click();
  }

  return (
    <div className={styles.container}>
      <QueryBuilder valueDelimiter="=" onChange={(val) => setQueryValue(val)} queryFilters={FILTERS} />
      <Button onClick={openUploadFile}>CSV</Button>
      <input ref={inputRef} accept=".csv" style={{ display: 'none' }} type="file" />
    </div>
  );
}

TwitterQueryBuilder.defaultProps = {
  onChange: () => {},
};

TwitterQueryBuilder.propTypes = {
  onChange: PropTypes.func,
};
