import React from 'react';
import PropTypes from 'prop-types';
import Tree from 'react-d3-tree';
import clsx from 'clsx';
import styles from './VoaChart.module.css';

export default function VoaChart({
  chartData,
  className,
  emptyMessage,
}) {
  const id = `tree-chart-${Math.floor(Math.random() * 99999) + 1}`;
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);

  function isDataEmpty() {
    return !chartData
      || typeof chartData !== 'object'
      || !chartData.hasOwnProperty('name');
  }

  React.useEffect(() => {
    function getCenter() {
      const container = document.getElementById(id);
      const gElem = container.getElementsByClassName('rd3t-g');
      if (gElem.length === 0) {
        return false;
      }
      const gTop = Math.max(gElem[0].getBoundingClientRect().y * -1, 0) + 300;
      const gLeft = Math.max(gElem[0].getBoundingClientRect().x * -1, 0) + 100;
      setOffsetX(gLeft);
      setOffsetY(gTop);
      return true;
    }
    function setDefaultZoom() {
      const container = document.getElementById(id);
      const gElem = container.getElementsByClassName('rd3t-g');
      if (gElem.length === 0) {
        return false;
      }
      const cHeight = container.getBoundingClientRect().height;
      const cWidth = container.getBoundingClientRect().height;
      const gHeight = gElem[0].getBoundingClientRect().height;
      const gWidth = gElem[0].getBoundingClientRect().width;

      let zoomY = 1;
      let zoomX = 1;
      if (gHeight > cHeight) {
        zoomY = cHeight / gHeight;
      }
      if (gWidth > cWidth) {
        zoomX = cWidth / gWidth;
      }
      setZoom(Math.min(zoomY, zoomX));
      return true;
    }

    setDefaultZoom();
    getCenter();
  }, [chartData]);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }) => (
    <g>
      <circle r={15}></circle>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div style={{  }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {/* {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )} */}
        </div>
      </foreignObject>
    </g>
  );
  const nodeSize = { x: 100, y: 150 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 0 };
  return (
    <div id={id} className={clsx(styles.voaChartContainer, className)}>
      {!isDataEmpty()
        ? (
          <Tree
            data={chartData}
            svgClassName={styles.chart}
            rootNodeClassName={styles.root}
            branchNodeClassName={styles.branch}
            leafNodeClassName={styles.leaf}
            translate={{ x: offsetX, y: offsetY }}
            zoom={zoom}
            separation={{ siblings: 0.5, nonSiblings: 1 }}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
          />
        )
        : <div className={styles.empty}>{emptyMessage}</div>}
    </div>
  );
}

VoaChart.defaultProps = {
  chartData: {},
  className: '',
  emptyMessage: '',
};

VoaChart.propTypes = {
  chartData: PropTypes.object,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
};
