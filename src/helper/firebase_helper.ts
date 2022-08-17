// // Firestore data converter
// const Converter = {
//   toFirestore: (city) => {
//     return {
//       name: city.name,
//       state: city.state,
//       country: city.country,
//     }
//   },
//   fromFirestore: (snapshot, options) => {
//     const data = snapshot.data(options)
//     return new City(data.name, data.state, data.country)
//   },
// }
