import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const AdminPage = () => {
  return (
    <>
      <CustomBreadcrumbs current="admin"
       breadcrumbs={
        [
          { label: 'Home', to:'/' },
          { label: 'Admin', to:'/admin' },
        ]
      } />

      <div>AdminPage</div>
    </>
  );
};
