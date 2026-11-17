import LoginForm from "./LoginForm";

export const metadata = { title: "Sign In | Dashboard" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "";

  return (
    <div className="min-h-screen bg-body flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl border border-default shadow-sm p-8 sm:p-10">
          <h1 className="text-3xl font-ovo font-bold gradient-text text-center">
            Admin Sign In
          </h1>
          <p className="mt-3 text-center text-sm text-secondary">
            Manage your portfolio projects.
          </p>

          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}