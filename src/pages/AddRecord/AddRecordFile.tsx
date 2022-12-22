import React from 'react'
import Camera from '@assets/camera.svg'

function AddRecordFile() {
  return (
    <div>
      {/* <input className="upload-name" value="첨부파일" placeholder="첨부파일" /> */}
      <label htmlFor="file">
        <div className="flex justify-center items-center flex-col w-[66px] h-[66px]  border-dashed rounded-2xl border-gray-400 border-2 py-3 px-5">
          <img className=" mb-1" src={Camera} alt="" />
          <p className=" text-gray-400 text-xs">0/1</p>
        </div>
      </label>
      <input
        className="hidden"
        id="file"
        type={'file'}
        accept="image/*;capture=camera"
      />
    </div>
  )
}

export default AddRecordFile
