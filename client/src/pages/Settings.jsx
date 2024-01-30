import { Link } from "react-router-dom";
import Layout from "../Layout/layout";
import orang from "../img/4836491 1.svg";

export default function Settings() {
  return (
    <Layout>
      <div className="p-5">
        <div className="border-2 border-[#c4c4c4] w-1/2 min-w-96 mx-auto p-5 rounded-md">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-5 my-5">
            <div className="border-2 rounded-full p-2 border-black">
              <img src={orang} alt="" />
            </div>
            <div>
              <h1 className="font-bold">Farrel Giovanni Jaohari</h1>
              <Link className="text-primary">Change profile picture</Link>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex justify-between">
              <h1>Name</h1>
              <Link className="text-primary">Change name</Link>
            </div>
            <h1 className="font-bold mt-1">Farrel Giovanni Jaohari</h1>
          </div>
          <div className="mb-5">
            <div className="flex justify-between">
              <h1>Email</h1>
              <Link className="text-primary">Change email</Link>
            </div>
            <h1 className="font-bold mt-1">akuntumbal@gmail.com</h1>
          </div>
          <div className="mb-5">
            <div className="flex justify-between">
              <h1>Password</h1>
              <Link className="text-primary">Change password</Link>
            </div>
            <h1 className="font-bold mt-1">********</h1>
          </div>

          <div className="flex justify-end gap-5">
            <button className="button max-w-32">Cancel</button>
            <button className="button coloredButton max-w-32">Save</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
