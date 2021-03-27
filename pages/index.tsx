import styled from "styled-components";
import axios from "axios";
import * as React from "react";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
  const [gif, setGif] = React.useState<string | undefined>();
  const uploadImage = React.useCallback(async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("theImage", file);
    const response = await axios.post("/api/parrotify", formData, {
      responseType: "blob",
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    });
    const blob = new Blob([response.data], { type: "image/gif" });
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    setGif(url);
    link.href = url;
    link.download = "file.gif";
    link.click();
    link.remove();
  }, []);
  return (
    <>
      <Title>Party as a service</Title>
      <div>
        <input type="file" onChange={(e) => uploadImage(e.target.files)} />
        {gif && <img src={gif} />}
      </div>
    </>
  );
}
