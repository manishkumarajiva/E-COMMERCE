import React from "react";
import {Grid} from 'react-loader-spinner';
const style = {backgroundColor: 'transparent', width : '50vw', height : '50vh', display : 'flex', justifyContent:'center', alignItems:'center'};

const Loader = () => {
  return (
    <Grid
      visible={true}
      height='80'
      width='80'
      color='#7158e2'
      ariaLabel='grid-loading'
      radius='12.5'
      wrapperStyle={style}
      wrapperClass='grid-wrapper'
    />
  );
};

export default Loader;
