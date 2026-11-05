import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  current: string;
  breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ current, breadcrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to="/" />}>Inicio</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((bread) => (
          <Fragment key={bread.to}>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbLink render={<Link to={bread.to} />}>
              {bread.label}
            </BreadcrumbLink>
          </Fragment>
        ))}
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-black">{current}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
