import React from 'react'
import Camera from '@assets/camera.svg'

function AddRecordFile() {
  return (
    <div>
      <label htmlFor="file">
        <div className="flex h-[66px] w-[66px] flex-col items-center justify-center  rounded-2xl border-2 border-dashed border-gray-400 py-3 px-5">
          <img className=" mb-1" src={Camera} alt="camera" />
          <p className=" text-xs text-gray-400">0/1</p>
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
