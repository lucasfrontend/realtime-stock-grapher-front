import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import CustomPaginator from './CustomPaginator';

const CustomChart = ({ title, seriesData, historicalSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = seriesData.slice(startIndex, endIndex);
  
  // código para mobile. 
  // detecta el tamaño de pantalla para ajustar cantidad de registros a mostrar, de vistas tablet para abajo.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageSize(10);
      } else {
        setPageSize(40);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const transformedData = currentPageData && currentPageData.length > 0 ? currentPageData.map(dataPoint => ({
    y: parseFloat(dataPoint.close)
  })) : [];
  
  const dateTimeLabels = currentPageData && currentPageData.length > 0 ? currentPageData.map(dataPoint => {
    const date = new Date(dataPoint.datetime);
    let formattedLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (historicalSearch) {
      const formattedDate = date.toLocaleDateString();
      formattedLabel = `${formattedDate} ${formattedLabel}`;
    }

    return formattedLabel;
  }) : [];

  const options = {
    title: {
      text: title
    },
    series: [{
      name: 'Intérvalo',
      data: transformedData,
      tooltip: {
        valueDecimals: 2
      }
    }],
    xAxis: {
      categories: dateTimeLabels,
      labels: {
        rotation: -45,
        step: 1
      }
    },
    yAxis: {
      title: {
        text: 'Precio'
      },
      labels: {
        formatter: function () {
          return '$' + this.value;
        }
      }
    }
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      <div>
        <CustomPaginator 
          pageCount={Math.ceil(seriesData.length / pageSize)} 
          handlePageClick={handlePageClick} 
        />
      </div>
    </div>
  );
};

export default CustomChart;
