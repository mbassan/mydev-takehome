import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Tab from './Tab';
import TabPanel from './TabPanel';
import TabControls from './TabControls';
import TabPagination from './TabPagination';
import styles from './Tabs.module.css';

function Tabs({
  selected,
  variant,
  children,
}) {
  const getSelectedIndex = React.useCallback((tabName) => {
    let index = 0;
    if (tabName || selected) {
      index = children.findIndex((elem) => elem.type === Tab && ((tabName || selected) === elem.props.name));
    }
    return index;
  }, [children, selected]);
  
  const [selectedTabName, setSelectedTabName] = React.useState(selected);
  const [selectedIndex, setSelectedIndex] = React.useState(getSelectedIndex());
  const [selectClass, setSelectClass] = React.useState('left');

  function onClick(elem, i) {
    if (elem.props.disabled) {
      return false;
    }

    setSelectClass(selectedIndex < i ? 'right' : 'left');
    setSelectedTabName(elem.props.name);
    setSelectedIndex(i);
    elem.props.onClick();
    return true;
  }

  function renderTabs() {
    const tabElems = [];

    children.forEach((elem, i) => {
      if (elem.type === Tab) {
        tabElems.push(
          <elem.type
            {...elem.props} 
            selected={selectedTabName === elem.props.name || (!selectedTabName && i === 0)}
            onClick={() => onClick(elem, i)}
            selectClass={selectClass}
            variant={variant}
            key={i}
          />
        );
      }
    });

    return tabElems;
  }

  function renderTabPanels() {
    const tabPanelElems = [];
    let i = 0;
    children.forEach((elem) => {
      if (elem.type === TabPanel) {
        tabPanelElems.push(
          <elem.type
            {...elem.props}
            selected={selectedTabName === elem.props.name || (!selectedTabName && i === 0)}
            selectClass={selectClass}
            variant={variant}
            key={i}
          >
            {elem.props.children}
          </elem.type>
        );
        i += 1;
      }
    });

    return tabPanelElems;
  }

  function renderControls() {
    const controls = [];

    children.forEach((elem, i) => {
      if (elem.type === TabControls) {
        controls.push(<elem.type {...elem.props} key={i} />);
      }
    });

    return controls;
  }

  function renderPagination() {
    const tabPaginationElems = [];
    let i = 0;
    children.forEach((elem) => {
      if (elem.type === TabPagination) {
        tabPaginationElems.push(
          <elem.type
            {...elem.props}
            selected={selectedTabName === elem.props.name || (!selectedTabName && i === 0)}
            key={i}
          >
            {elem.props.children}
          </elem.type>
        );
        i += 1;
      }
    });

    return tabPaginationElems;
  }

  const selectTab = React.useCallback((tabName) => {
    setSelectedTabName(tabName);
    setSelectedIndex(getSelectedIndex(tabName));
  }, [getSelectedIndex]);

  React.useEffect(() => {
    if (selected && selected.length > 0) {
      selectTab(selected);
    }
  }, [
    selected,
    selectTab,
  ]);

  return (
    <div className={styles.tabsWrapper}>
      <div className={clsx(styles.tabsContainer, styles[variant])}>
        <div className={styles.tabsTabs}>
          {renderTabs()}
        </div>
        {renderPagination()}
        {renderControls()}
      </div>
      <div className={clsx(styles.tabsPanelContainer, styles[variant])}>
        {renderTabPanels()}
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  variant: 'default',
  selected: null,
  children: [],
};

Tabs.propTypes = {
  variant: PropTypes.oneOf(['default', 'panel']),
  selected: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export {
  Tabs,
  Tab,
  TabPanel,
  TabControls,
  TabPagination,
};
