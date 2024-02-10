import LayoutLogin from "../Layout/layoutLogin";

export default function Selection() {
  return (
    <LayoutLogin>
      <div className="min-w-80">
        <div className="text-center mb-7">
          <h1 className="text-primary mb-3 font-bold text-3xl">Present</h1>
          <p className="font-bold text-lg">Register</p>
        </div>
        <form className="min-w-sm">
          <div className="mb-5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="example"
              className="input"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="input"
            />
          </div>
          <div className="mb-10">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
            />
          </div>
          <button type="submit" className="button coloredButton">
            Register
          </button>
        </form>
        <div className="absolute bottom-3 w-full text-center left-0">
          <h4 className="text-sm">
            Already have an account?
            <a className="text-primary font-bold" href="/login">
              {" "}
              click here
            </a>
          </h4>
        </div>
      </div>
    </LayoutLogin>
  );
}
