import React, {useState, useEffect} from "react";
import { CustomLink } from './CustomLink';
import { useNavigate } from "react-router-dom";
import { getUsername } from "../services/authServices";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
    IdentificationIcon,
    ChartPieIcon,
    ClipboardDocumentCheckIcon,
    BanknotesIcon,
    RectangleStackIcon,
    MinusIcon,
    UserGroupIcon,
    CalendarIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
 
export function Sidebar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUsername();
      setUsername(name);
    };

    fetchUsername();
  }, []);

 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-screen  w-full relative max-w-[19rem] p-4 shadow-none border-r-[1px] border-gray-300 shadow-blue-gray-900/5 rounded-none">
    
      <div className="mb-2 flex items-center gap-4 p-4">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="black" />
    </svg>
        <Typography variant="h5" color="blue-gray">
          {username}
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
             <CustomLink to="/">
             <ListItem ripple={false}>
          <ListItemPrefix>
            <CalendarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Календарь
        </ListItem>
             </CustomLink>
             <CustomLink to="/roles">
            <ListItem ripple={false}>
          <ListItemPrefix>
            <IdentificationIcon className="h-5 w-5" />
          </ListItemPrefix>
          Роллар
        </ListItem>
        </CustomLink>
          <ListItem ripple={false} className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Беморлар
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <CustomLink to="/patients">
              <ListItem ripple={false}>
              <ListItemPrefix>
                <MinusIcon className="h-5 w-5" />
              </ListItemPrefix>
                Барча Беморлар
              </ListItem>
              </CustomLink>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem ripple={false} className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <RectangleStackIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Каталог
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <CustomLink to="/doctors">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Докторлар
              </ListItem>
              </CustomLink><CustomLink to="/users">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Фойдаланувчилар
              </ListItem>
              </CustomLink>
            <CustomLink to="/services">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Хизматлар
              </ListItem>
              </CustomLink>
            <CustomLink to="/partners">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Ҳамкорлар
              </ListItem>
              </CustomLink>
            <CustomLink to="/epidemiological_history">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Эпиданамнез
              </ListItem>
              </CustomLink>
            <CustomLink to="/international-classification-of-diseases">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                МКБ-10
              </ListItem>
              </CustomLink>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem ripple={false} className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BanknotesIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Туловлар
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <CustomLink to="/payments">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Туловлар тарихи
              </ListItem>
              </CustomLink>
            <CustomLink to="/depts_lists">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Қарздорлар рўйхати
              </ListItem>
              </CustomLink>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem ripple={false} className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ClipboardDocumentCheckIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              Қабуллар
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <CustomLink to="/admissions">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Навбатда
              </ListItem>
              </CustomLink>
             <CustomLink to="new_admissions">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Қайта навбатлар
              </ListItem>
              </CustomLink>
             <CustomLink to="re_admissions">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Қайта қабуллар
              </ListItem>
              </CustomLink>
             <CustomLink to="/list_of_disponser">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Диспансер ҳисоби
              </ListItem>
              </CustomLink>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem ripple={false} className="p-0" selected={open === 5}>
            <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ChartPieIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              Ҳисоботлар
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Кунлик
              </ListItem>
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Беморлар буйича
              </ListItem>
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Қабуллар бўйича
              </ListItem>
              <ListItem ripple={false}>
                <ListItemPrefix>
                  <MinusIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Саналар буйича
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
      </List>
    </Card>
  );
}