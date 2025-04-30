import React from 'react'

const GenderCheckbox = ({
    selectedGender,
    onCheckBoxChange,
}: {
    selectedGender: string;
    onCheckBoxChange: (gender: "male" | "female" | "other") => void;
}


) => {
  return (
    <div className='flex mt-3'>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text"> Male </span>
                <input type="checkbox" className='checkbox border-slate-900'
                checked={selectedGender === "male"}
                onChange={()=>onCheckBoxChange("male")}
                />
            </label>
        </div>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text"> Female </span>
                <input type="checkbox" className='checkbox border-slate-900'
                checked={selectedGender === "female"}
                onChange={()=>onCheckBoxChange("female")}

                />
            </label>
        </div>
        <div className='form-control'>
            <label className="label gap-2 cursor-pointer">
                <span className="label-text"> Other </span>
                <input type="checkbox" className='checkbox border-slate-900'
                checked={selectedGender === "other"}
                onChange={()=>onCheckBoxChange("other")}

                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox