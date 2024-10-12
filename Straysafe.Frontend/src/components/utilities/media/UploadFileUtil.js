/**
 * 
 * @param {URL} url 
 * @param {File} file 
 * @param {string} customName
 * @returns {Promise<any>} json response
 */
export const UploadFile = async (url, file, customName = "") => {
    let formData = new FormData();

    if(customName === "") customName = file.name;
    else customName = `${customName}.${file.name.split(".")[1]}`;

    formData.append("File", file, customName);
    const config = {
      method: "POST",
      body: formData,
    };

    const resp = await fetch(url, config);
    const data = await resp.json();

    return data;
}