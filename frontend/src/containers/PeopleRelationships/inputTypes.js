import React from 'react';
import ShodanQueryBuilder from 'ui/components/ShodanQueryBuilder';
import TwitterQueryBuilder from 'ui/components/TwitterQueryBuilder';
import XforceInput from './InputComponents/XforceInput';
import W3dt from './InputComponents/W3dt';

export default [
  { value: 'a-record', label: 'A-Record', handleData: (val) => val },
  { value: 'twitter', label: 'Twitter', inputComponent: (onChange) => <TwitterQueryBuilder onChange={onChange} /> },
  {
    value: 'emailformat', label: 'Email-Format', handleData: (val) => val, inputPlaceholder: 'Firstname, lastname, domain',
  },
  { value: 'dns-records', label: 'Dns Records per Domain', handleData: (val) => val },
  { value: 'mx-records', label: 'Mx Records per Domain', handleData: (val) => val },
  { value: 'companies-opencorporates', label: 'Search for company records', handleData: (val) => val },
  {
    value: 'xforce',
    label: 'Xforce',
    inputComponent: (onChange) => <XforceInput onChange={onChange} />,
    handleData: (val) => val,
  },
  {
    value: 'w3dt',
    label: 'W3dt',
    inputComponent: (onChange) => <W3dt onChange={onChange} />,
    handleData: (val) => val,
  },
  { value: 'officers-opencorporates', label: 'Search for officers records', handleData: (val) => val },
  {
    value: 'shodan-search',
    label: 'Geo Mapping by Query',
    handleData: (val) => val,
    inputComponent: (onChange) => (
      <ShodanQueryBuilder onChange={onChange} />
    ),
  },
  { value: 'shodan-host', label: 'Geo Mapping by Host', handleData: (val) => val },
  {
    value: 'wfuzz', label: 'fuzzing', handleData: (val) => val, inputPlaceholder: 'Example: http://FUZZ.example.com, http://example.com/FUZZ',
  },
  {
    value: 'dnstwist', label: 'dns fuzzing', handleData: (val) => val,
  },
  {
    value: 'gitlab', label: 'Repo gitlab search', handleData: (val) => val,
  },
  {
    value: 'github', label: 'Repo github search', handleData: (val) => val,
  },
  {
    value: 'nmap', label: 'Domain port scan', handleData: (val) => val,
  },
  {
    value: 'nmapos', label: 'Domain OS', handleData: (val) => val,
  },
];
