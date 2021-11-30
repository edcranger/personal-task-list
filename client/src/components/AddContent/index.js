import React, { useRef, useState, useEffect, useContext } from "react";

//icons
import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

//styles
import {
  Wrapper,
  TextArea,
  Header,
  MainContainer,
  MediaContainer,
  MediaButtons,
  UploadPhoto,
  ImgContainer,
  PreviewPhoto,
  PhotoContainer,
} from "./AddContentElements";

//components
import Button from "../Button";

import TodoContext from "../../context/todos/TodoContext";

const AddContent = ({ todoId, setShowModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [textContent, setTextContent] = useState("");

  const hiddenFileInput = useRef(null);

  const { createContent } = useContext(TodoContext);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files);
  };

  const handlePost = async () => {
    const formData = new FormData();

    if (selectedFile) {
      [...selectedFile].forEach((img) => {
        formData.append("photo", img);
      });
    }

    formData.append("description", textContent);

    const res = await createContent({
      todoId,
      formData,
    });

    if (res.success) {
      setSelectedFile(null);
      setPreview(null);
      setTextContent("");
      setShowModal(false);
    }
  };

  const deletePhoto = (file) => {
    setSelectedFile([...selectedFile].filter((sel) => sel !== file.file));
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = [...selectedFile].map((pic) => {
      return { file: pic, url: URL.createObjectURL(pic) };
    });

    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Wrapper>
      <Header>
        <h2 className="header-text">Create Content</h2>
      </Header>
      <MainContainer>
        <TextArea
          placeholder="Add content here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          withphoto={selectedFile}
        />

        <ImgContainer>
          {preview
            ? preview.map((img, index) => (
                <PhotoContainer key={index}>
                  <AiOutlineCloseCircle
                    className="closeBtn"
                    onClick={() => deletePhoto(img)}
                  />

                  <PreviewPhoto src={img.url} />
                </PhotoContainer>
              ))
            : null}
        </ImgContainer>
      </MainContainer>
      <MediaContainer>
        <MediaButtons
          width="30px"
          height="30px"
          corners="50%"
          onClick={handleClick}
        >
          <BsFillImageFill color="green" size="20px" />
          <UploadPhoto
            ref={hiddenFileInput}
            multiple
            type="file"
            onChange={handleChange}
          />
        </MediaButtons>
      </MediaContainer>
      <Button onClick={handlePost}>Post</Button>
    </Wrapper>
  );
};

export default AddContent;
