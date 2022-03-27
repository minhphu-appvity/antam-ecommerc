import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { storage } from "app/const/firebase";
import { addProductAction } from "core/redux/actions/productActions";
import { Toasts } from "./toasts/toasts";

function Form({ heading }) {
  const [dataSubmit, setDataSubmit] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [urls, setUrls] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    const uploadList = [];
    const extension = /\.(gif|jpe?g|png|jpg)$/i;
    let canUploadFile = false;

    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      if (extension.test(image.name)) {
        canUploadFile = true;
        uploadList.push(files[i]);
      }
    }

    if (canUploadFile) {
      const promises = [];
      uploadList.forEach((image) => {
        const uploadTask = storage
          .ref()
          .child(`images/${image.name}`)
          .put(image);

        promises.push(uploadTask);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            if (snapshot.state === "running") {
              console.log(`Đang tải: ${progress}%`);
            }
          },
          (error) => {
            console.log({ error });
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

            setUrls((prevState) => [...prevState, downloadURL]);
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          alert("Đã upload thành công!!!");
        })
        .catch((err) => console.log(err.code));
    } else {
      setErrors({
        ...errors,
        files: "Vui lòng chọn đúng định dạng hình ảnh",
      });
    }
    // show file hiển thị ra bên ngoài ô input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = dataSubmit;

    let errorMgs = {};

    if (!title.length) {
      errorMgs.title = "Vui lòng điền vào trường này";
    }

    if (!content.length) {
      errorMgs.content = "Vui lòng điền vào trường này";
    }

    if (_.isEmpty(errorMgs)) {
      const payload = {
        ...dataSubmit,
        img: [...urls],
      };

      dispatch(addProductAction(payload));

      cancelModal();
    } else {
      setErrors({ ...errorMgs });
    }

    return;

    // saveProduct(this.state.data)
    // this.props.history.push("/admin/all-products");
  };

  const cancelModal = () => {
    setDataSubmit({});
    history.push("/admin/all-products");
  };

  return (
    <div className="modal-form">
      <div className="modal-body">
        <h1>{heading}</h1>

        <form>
          <div className="form-group">
            <label htmlFor="title">Tên sản phẩm: </label>
            <input
              id="title"
              name="title"
              value={dataSubmit.title}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          {errors.title && (
            <div className="alert alert-danger">{errors.title}</div>
          )}

          <div className="form-group">
            <label htmlFor="content">Nội dung :</label>
            <input
              id="content"
              name="content"
              value={dataSubmit.content}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          {errors.content && (
            <div className="alert alert-danger">{errors.content}</div>
          )}

          <div className="form-group">
            <label htmlFor="image">Hình ảnh:</label>

            <input
              id="image"
              type="file"
              multiple
              onChange={handleChangeFile}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>

          {errors.files && (
            <div className="alert alert-danger">{errors.files}</div>
          )}
        </form>

        <div className="row">
          {urls.map((url) => {
            return (
              <div className="col-3 mt-3" key={url}>
                <img src={url} alt={url} />
              </div>
            );
          })}
        </div>
        <div className="modal-button">
          <button onClick={cancelModal} className="modal-button-cancel">
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="modal-button-save"
            type="button"
          >
            Tạo sản phẩm
          </button>
        </div>
      </div>

      <Toasts />
    </div>
  );
}

export default Form;
