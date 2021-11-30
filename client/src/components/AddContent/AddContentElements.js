import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Wrapper = styled.div`
  display: flex;
  min-height: 34px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Header = styled.div`
  border-bottom: 1px solid var(--midGrey);
  margin: 0 0 20px 0;

  .header-text {
    margin: 0;
    color: var(--midGrey);
  }
`;

export const TextArea = styled(TextareaAutosize)`
  min-height: ${({ withphoto }) =>
    withphoto && withphoto.length !== 0 ? "auto" : "250px"};
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  resize: none;
  scroll-behavior: none;
  font-size: 1.2rem;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const MainContainer = styled.div`
  flex: 1;
  max-height: 600px;
  overflow-y: auto;
`;

export const MediaContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
`;

export const MediaButtons = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

export const UploadPhoto = styled.input`
  display: none;
`;

export const PhotoContainer = styled.div`
  width: 100%;
  position: relative;

  .closeBtn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 7px;
    right: 7px;
    color: var(--white);
    background: var(--midGrey);
    transition: all 0.3s ease-in;
    cursor: pointer;

    :hover {
      transform: scale(1.3);
    }
  }
`;

export const PreviewPhoto = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const ImgContainer = styled.div`
  display: grid;
  width: 100%;
  max-height: 300px;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
`;
