// import { useEffect, useState } from 'react';
// import './App.css';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { getData } from './Api';

// function App() {
//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleAdd = (e) => {
//     axios.post("http://localhost:3030/posts", e).then((res) => {
//       console.log(res);
//       getData().then((res) => {
//         setData([...res]);
//       });
//     });
//   };

//   const handleUpdate = (e) => {
//     axios.put(`http://localhost:3030/posts/${selectedId}`, e).then((res) => {
//       console.log(res);
//       getData().then((res) => {
//         setData([...res]);
//       });
//       setSelectedId(null); 
//     });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
//       const updatedData = data.filter((item) => item.id !== id);
//       setData(updatedData);
//     });
//   };

//   const selectItemForUpdate = (id) => {
//     setSelectedId(id);
//   };

//   const cancelUpdate = () => {
//     setSelectedId(null);
//   };

//   useEffect(() => {
//     getData().then((res) => {
//       setData([...res]);
//     });
//   }, []);

//   return (
//     <div className='container'>
//       <form onSubmit={selectedId !== null ? handleSubmit(handleUpdate) : handleSubmit(handleAdd)} className='mb-5'>
//         <input {...register("firstName")} />
//         <input {...register("lastName", { required: true })} />
//         {errors.lastname && <p>Last name is required.</p>}
//         <input {...register("age", { pattern: /\d+/ })} />
//         {errors.age && <p>Please enter a number for age.</p>}
//         <input type="submit" value={selectedId !== null ? 'Update' : 'Add'} />
//         {selectedId !== null && (
//           <button type="button" onClick={cancelUpdate}>Cancel</button>
//         )}
//       </form>
//       <div className='card col-4 '>
//         {data.map((e, ind) => {
//           return (
//             <div key={ind} className='p-5 border'>
//               <h2>ID is {e.id}</h2>
//               <h4>Name is {e.firstName} {e.lastName}</h4>
//               <h4>Age is {e.age}</h4>
//               <button className='btn btn-primary' onClick={() => handleDelete(e.id)}>Delete</button>
//               <button className='btn btn-secondary' onClick={() => selectItemForUpdate(e.id)}>Update</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { getData } from './Api';

function App() {
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //data post
  const handle = (e) => {
    console.log(e);
    axios.post(" http://localhost:3030/posts", e).then((res) => {
      console.log(res);
      Fdata()
    });
  };

  // delete data
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
      const updateddata = data.filter((item) => item.id !== id);
      setData(updateddata);
    })
  }
  // console.log(x);
  useEffect(() => {
    Fdata()
  }, []);

  const url = "http://localhost:3030/posts"
// upadte data
  const Fdata = () => {
    axios.get(url).then((res) => {
      setData(res.data)
    })
  }

  const [Updata, setUpdata] = useState(null)

  const Editdata = (ind) => {
    const Up = data[ind]
    console.log(Up);
    setUpdata(Up)
  }

  const handlar = (e) => {
    setUpdata({ ...Updata, [e.target.name]: e.target.value })
  }

  const Fedit = (id) => {
    axios.put(`http://localhost:3030/posts/${id}`, Updata).then((res) => {
      Fdata()
      setUpdata(null)
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(handle)} className='mb-5'>
        <input {...register("firstName")} />
        <input {...register("lastName", { required: true })} />
        {errors.lastname && <p>Last name is required.</p>}
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>

      {Updata && (
        <>
          <input type='text' name='firstName' onChange={handlar} value={Updata.firstName} />
          <input type='text' name='lastName' onChange={handlar} value={Updata.lastName} />
          <input type='text' name='age' onChange={handlar} value={Updata.age} />
          <button onClick={() => Fedit(Updata.id)}>edit</button>
        </>
      )}


      <div className='card col-4 p-5 border-5'>
        {data.map((e, ind) => {
          return (
            <div key={ind}>
              <h2>ID is {e.id}</h2>
              <h4>Name is {e.firstName} {e.lastName}</h4>
              <h4>Age is {e.age}</h4>
              <button className='btn btn-primary m-2' onClick={() => handleDelete(e.id)}>Delete</button>
              <button className='btn btn-primary m-2' onClick={() => Editdata(e.id)}>Edit</button>
              {/* <button onClick={() => Editdata(ind)}>Edit</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;