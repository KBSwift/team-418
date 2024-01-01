import React, {useState} from 'react';
import HomeBase from '../../assets/HomeBase.svg';
import { Link } from 'react-router-dom';

const AccountSettings = () => {

    const userEmail = 'examplemail@ex.com';

  return (
    <div className="container-fluid">
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <div className="row">
            <div className="mx-auto">
              <div className="mb-4">
                <h5 className="mb-0">Contact Information</h5>
              </div>
              <form className="mb-6">
                <div>
                    <label className="form-label" htmlFor="email">
                    Email
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={userEmail}
                    readOnly
                    />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;