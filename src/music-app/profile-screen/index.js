import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUserThunk, logoutThunk } from '../services/auth-thunks';
import * as tuitsService from '../services/reviews-service';
import { profileThunk } from '../services/auth-thunks';
import { findMyReview } from '../services/reviews-thunks';

const ProfileScreen = () => {

    const {currentUser} = useSelector(state => state.users);
    const [profile, setProfile] = useState(currentUser);
    const [myReview, setMyReview] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const saveProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };

    const loadProfile = async () => {
      const {payload} = await dispatch(profileThunk());
      setProfile(payload);
    }

    const fetchMyReview = async () => {
      const res = await dispatch(findMyReview());
      setMyReview(res.payload);
    }

    useEffect(() => {
      loadProfile();
      fetchMyReview();
    }, []);

    console.log(myReview);
    return (
        
        <div>
            <h2 className="font-bold text-2xl">Profile</h2>
            { profile && 
                (<div>
                    <div>
                        <label>Username</label>
                        <input className='form-control'
                            type="text" value={profile.username}
                            disabled/>
                    </div>
                    <div>
                        <label>User type</label>
                        <input className='form-control'
                            type="text" value={profile.userType}
                            disabled/>
                    </div>
                    <div>
                        <label>First Name</label>
                        <input className='form-control' 
                            type="text" value={profile.firstName}
                            onChange={(e) => {
                                const newProfile = {...profile, firstName: e.target.value};
                                setProfile(newProfile);
                        }}/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input className='form-control'
                            type="text" value={profile.lastName}
                            onChange={(e) => {
                                const newProfile = {...profile, lastName: e.target.value};
                                setProfile(newProfile);
                        }}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input className='form-control'
                            type="email" value={profile.email}
                            onChange={(e) => {
                                const newProfile = {...profile, email: e.target.value};
                                setProfile(newProfile);
                        }}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input className='form-control'
                            type="password" value={profile.password}
                            onChange={(e) => {
                                const newProfile = {...profile, password: e.target.value};
                                setProfile(newProfile);
                        }}/>
                    </div>
                </div>
            )}
            <button className='btn btn-danger mt-2 me-2'
                    onClick={() => {
                                    dispatch(logoutThunk());
                                    navigate("/login");}
                            }>
                Logout
            </button>
            <button className='btn btn-primary mt-2'
                    onClick={() => {saveProfile()}}>
                Save
            </button>
            <pre>{JSON.stringify(myReview, null, 2)}</pre>
        </div>
    )
}

export default ProfileScreen;