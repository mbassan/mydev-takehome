import React from 'react';
import PropTypes from 'prop-types';
import CountryPicker from 'ui/components/CountryPicker';
import QueryBuilder from 'ui/components/QueryBuilder';

const FILTERS = [
  {
    value: 'hostname',
    label: 'Hostname',
  },
  {
    value: 'city',
    label: 'City',
  },
  {
    value: 'country',
    label: 'Country',
    inputComponent: (onChange) => <CountryPicker onChange={onChange} />,
  },
  {
    value: 'geo',
    label: 'Geo',
  },
  {
    value: 'product',
    label: 'Product',
  },
  {
    value: 'state',
    label: 'State',
  },
  {
    value: 'net',
    label: 'Net',
  },
];

export default function ShodanQueryBuilder({
  onChange,
}) {
  return <QueryBuilder onChange={onChange} queryFilters={FILTERS} />;
}

ShodanQueryBuilder.defaultProps = {
  onChange: () => {},
};

ShodanQueryBuilder.propTypes = {
  onChange: PropTypes.func,
};
