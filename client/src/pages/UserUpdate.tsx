import UserForm from "#components/UserForm";
import type { UserFormProps } from "#components/UserForm";


export default function UpdateUser() {
  const props: UserFormProps = {
    path: "/api/users",
    title: "Update User",
    redirect: "/dashboard",
    reqMethod: "PUT",
    submitBtnName: "Update"
  }

  return (
    <UserForm {...props}/>
  );
}
