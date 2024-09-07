// import React from "react";

// const CategoryForm = ({ handleSubmit, value, setValue }) => {
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new category"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit{" "}
//         </button>
//       </form>
//     </>
//   );
// };

// export default CategoryForm;

import React from "react";

const CategoryForm = ({ handleSubmit, name, setName, photo, setPhoto }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          value={name}
          placeholder="Category Name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="btn btn-outline-secondary col-md-12">
          {photo ? photo.name : "Upload Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            hidden
          />
        </label>
      </div>
      {photo && (
        <div className="mb-3 text-center">
          <img
            src={URL.createObjectURL(photo)}
            alt="category_photo"
            height={"200px"}
            className="img img-responsive"
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
