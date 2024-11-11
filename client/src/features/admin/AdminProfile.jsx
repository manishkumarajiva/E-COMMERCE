import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAsync} from "../userSlice";
import {AdminInfo} from "../userSlice";
import {useForm} from "react-hook-form";

function AdminProfile() {
  const user = useSelector(selectUserInfo);
  const [openAddressForm, setAddressForm] = useState(false);
  return (
    <Fragment>
      <div className='container mx-auto'>

        <div className='px-5 rounded-lg'>
          <h1 className='text-xl'>Profile Info</h1>
          <AdminInfo user={user}></AdminInfo>
        </div>

        <div className="px-5 mt-4">
          <button onClick={()=>setAddressForm(openAddressForm ? false : true)} className='px-3 py-2 text-white bg-green-500 rounded-md hover:bg-blue-500'> {!openAddressForm ? 'Add New Shipping Address'  : 'Close Address Form' } </button>
          { openAddressForm && <AddNewShippingAddress user={user} closeForm={setAddressForm}></AddNewShippingAddress>}
        </div>

      </div>
    </Fragment>
  );
}

export default AdminProfile;





















function AdminInfo({user}) {
  return (
    <Fragment>
      <div className=''>
        Email : <h1> {user.email} </h1>
        Name : <h3> {user.name ? user.name : "Your Name"} </h3>
      </div>
    </Fragment>
  );
}

