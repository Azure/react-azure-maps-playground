// import React, {useEffect, useState} from "react";
// import {
//   AzureMap,
//   AzureMapDataSourceProvider,
//   AzureMapLayerProvider,
//   AzureMapsProvider,
//   IAzureMapOptions
// } from "react-azure-maps";
// import {AuthenticationType} from "azure-maps-control";
// import {io} from "azure-maps-spatial-io";
// import {key} from "../../key";
// import {Button} from "@mui/material";

// const option: IAzureMapOptions = {
//   authOptions: {
//     authType: AuthenticationType.subscriptionKey,
//     subscriptionKey: key
//   },
//   center: [-100.01, 45.01],
//   zoom: 2,
//   view: "Auto"
// }

// const COVID: React.FC = () => {
//   const [featureCollection, setFeatureCollection] = useState()
//   const [clusterOptions, setClusterOptions] = useState({})
//   const [foo, setFoo] = useState(false)
//   useEffect(() => {
//     console.log("Refresh")
//     //Workaround: fetcht he data and replace all "/" values with their escaped version so that they don't get read as paths.
//     fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv')
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         data = data.replace(/\//g, '&#x2F;');
//         console.log("IO", io.read)
//         // @ts-ignore
//         io.read(data).then(features => {
//           if (features) {
//             setFeatureCollection(features)
//           }
//         })
//       });
//   }, [foo])
//   return (
//     <>
//       <div>
//         <Button
//           size="small"
//           variant="contained"
//           color="primary"
//           onClick={() => setFoo(prevState => !prevState)}
//         >
//           {' '}
//           REFRESH DATA
//         </Button>
//         <Button
//           size="small"
//           variant="contained"
//           color="primary"
//           onClick={() => setClusterOptions({cluster: foo})}
//         >
//           {' '}
//           SET CLusTER PROP
//         </Button>
//       </div>
//       <div style={styles.map}>
//         <AzureMapsProvider>
//           <AzureMap options={option}>
//             <AzureMapDataSourceProvider id={"LayerExample2 DataSource"}
//                                         collection={featureCollection}
//                                         options={clusterOptions}>
//               <AzureMapLayerProvider
//                 id={"CORONA HeatMap"}
//                 options={{
//                   radius: 10,
//                   opacity: 0.8
//                 }}
//                 type={"HeatLayer"}
//               ></AzureMapLayerProvider>
//             </AzureMapDataSourceProvider>
//           </AzureMap>
//         </AzureMapsProvider>
//       </div>
//     </>
//   );
// };

// const styles = {
//   map: {
//     height: 300,
//     marginBottom: 50
//   }
// };

export default {};
