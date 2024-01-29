import LayoutLogin from "../Layout/layoutLogin";

export default function Selection() {
  return (
    <LayoutLogin>
      <div className="min-w-80">
        <div className="text-center mb-7">
          <h1 className="text-primary mb-3 font-bold text-3xl">Present</h1>
          <p className="font-bold text-lg">Login</p>
        </div>
        <form className="min-w-sm">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mb-5"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="mb-5 flex justify-end mt-2">
            <h4 className="text-sm">
              Forgot your password?
              <span className="text-primary font-bold"> click here</span>
            </h4>
          </div>
          <button type="submit" className="button coloredButton">
            Login
          </button>
        </form>
        <div className="absolute bottom-3 w-full text-center left-0">
          <h4 className="text-sm">
            Don't have an account?
            <a className="text-primary font-bold" href="/register">
              {" "}
              click here
            </a>
          </h4>
        </div>
      </div>
    </LayoutLogin>
  );
}
