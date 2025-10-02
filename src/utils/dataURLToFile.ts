/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
export function dataURLtoFile(dataurl: string, filename: string): File {
  let arr: string[] = dataurl.split(","),
    mime: string = arr[0].match(/:(.*?);/)![1],
    bstr: string = atob(arr[arr.length - 1]),
    n: number = bstr.length,
    u8arr: Uint8Array = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr as any], filename, { type: mime });
}
