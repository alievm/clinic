import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import uzLocale from '@fullcalendar/core/locales/uz';
import { useCountries } from 'use-react-countries';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Menu, MenuHandler, MenuList, MenuItem, Radio, Typography } from '@material-tailwind/react';
import { ClockIcon, PhoneIcon } from '@heroicons/react/24/solid';
import Select from 'react-select';
import axios from 'axios';


function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full scale-105"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Calendar() {
  const [services, setServices] = useState([]);
  const { countries } = useCountries();
  const [country, setCountry] = useState(177);
  const { name, flags, countryCallingCode } = countries[country];
  const [selectedTime, setSelectedTime] = useState('00:00');
  const [eventTitle, setEventTitle] = useState('');
  const [eventNumber, setEventNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([{}]);
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState({});
  
  const axiosInstance = axios.create({
    baseURL: 'https://back.geolink.uz/api/v1'
  });


  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchEvents();
    fetchServices();
  }, []); 

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/admin/service");
      setServices(response.data.data);
    } catch (error) {
      console.error("Ошибка при получении списка сервисов:", error);
    }
  };
  const fetchEvents = async (calendarId) => {
    try {
      const response = await axiosInstance.get(`/calendar`);
      setEvents(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Ошибка при получении списка событий календаря:", error);
    }
  };

  const handleDateSelect = (selectInfo) => {
    const selectedDate = selectInfo.startStr;
    setSelectedTime('00:00');
    setOpenDialog(true);
    setSelectedDate(selectedDate);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEventTitle('');
    setEventNumber('');
    setSelectedType('');
    setSelectedService('');
    setSelectedEvent(null);
    setErrors({}); 
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleNumberChange = (event) => {
    setEventNumber(event.target.value);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setEventTitle(event.title);
    setEventNumber(event.extendedProps.phone);
  
    // Установите selectedService на основе выбранного события
    const selectedService = services.find(service => service.id === event.extendedProps.service.id);
    setSelectedService(selectedService ? { value: selectedService.id, label: selectedService.name } : '');
  
    if (event.start) {
      const hours = event.start.getHours();
      const minutes = event.start.getMinutes();
      setSelectedTime(`${hours}:${minutes}`);
    }
  
    setOpenDialog(true);
    setSelectedEvent(event);
  };
  
  

  const handleConfirmEvent = async () => {
    if (validateFields()) {
      return;
    }
  
    const eventData = {
      title: eventTitle,
      phone: eventNumber,
      start_at: `${selectedDate}T${selectedTime}`,
      service_id: selectedService,
      type: selectedType
    };
    console.log(selectedService)
  
    try {
      const response = await axiosInstance.post("/calendar", eventData);
      const newEvent = response.data.data;
      setEvents([...events, newEvent]);
      setOpenDialog(false);
      setEventTitle('');
      setEventNumber('');
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const handleUpdateEvent = async () => {
    if (!selectedEvent || validateFields()) {
      return;
    }
  
    const eventData = {
      id: selectedEvent.id,
      type: selectedType,
      start_at: `${selectedDate}T${selectedTime}`,
    };
  
    try {
      const response = await axiosInstance.put(`/calendar/${selectedEvent.id}`, eventData);
      const updatedEvent = response.data.data;
      const updatedEvents = events.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev));
      setEvents(updatedEvents);
      setOpenDialog(false);
      setEventTitle('');
      setEventNumber('');
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle error, show error message, etc.
    }
  };

  const renderEventContent = (eventInfo) => {
    const { title, phone } = eventInfo.event.extendedProps;
    const startTime = eventInfo.event.start ? eventInfo.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    return (
      <div>
        <p className='flex font-semibold items-center text-sm gap-1'>
          <img src="/watch2.png" className='h-4 w-4' alt="" /> {startTime}
        </p>
        <p className='font-bold text-sm flex items-center gap-1 mt-1 capitalize'>{title}</p>
        {/* <p className='font-medium text-sm flex items-center gap-1 mt-1'><PhoneIcon className='h-4 w-4' /> {phone}</p> */}
      </div>
    );
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedEvent = {
      title: event.title,
      service_id: event.extendedProps.service.id,
      phone: event.extendedProps.phone,
      start_at: event.start.toISOString(),
      type: event.extendedProps.type,
    };
  
    try {
      const response = await axiosInstance.put(`/calendar/${event.id}`, updatedEvent);
      if (response.status === 200) {
        fetchEvents(); // Обновите события после успешного обновления
      } else {
        console.error("Ошибка при обновлении события:", response);
      }
    } catch (error) {
      console.error("Ошибка при обновлении события:", error);
    }
  };
  

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };


  const validateFields = () => {
    const newErrors = {};
    let hasError = false;

    if (eventTitle.trim() === '') {
      newErrors.eventTitle = 'Илтимос ФИО-ни киринтинг';
      hasError = true;
    }

    if (eventNumber.trim() === '') {
      newErrors.eventNumber = 'Илтимос телефон ракамни киринтинг';
      hasError = true;
    }

    if (selectedDate === '') {
      newErrors.selectedDate = 'Пожалуйста, выберите дату.';
      hasError = true;
    }

    if (selectedTime === '00:00') {
      newErrors.selectedTime = 'Илтимос санани киринтинг';
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };
  

  return (
    <div className="w-full px-12">
      <FullCalendar
        locale={uzLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        themeSystem="lux"
        editable={true}
        height={'90vh'}
        selectable={true}
        selectMirror={true}
        events={events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start_at,
          end: event.end_at,
          extendedProps: {
            phone: event.phone,
            title: event.title,
            type: event.type,
            service: event.service,
          },
        }))}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />
      <Dialog className='w-min' open={openDialog} handler={handleDialogClose}>
        <DialogHeader className="text-lg font-medium leading-6 text-gray-900">Бемор қўшиш</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Input
              name="name"
              value={eventTitle}
              onChange={handleTitleChange}
              label="ФИО: *"
              size="lg"
              error={errors.eventTitle}
            />
            {errors.eventTitle && <p className="text-red-500 text-xs mt-1">{errors.eventTitle}</p>}
            <div className="flex mt-4">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-11 items-center gap-2 rounded-md rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img src={flags.svg} alt={name} className="h-4 w-4 rounded-full object-cover" />
                    {countryCallingCode}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] z-[9999] max-w-[18rem]">
                  {countries.map(({ name, flags, countryCallingCode }, index) => {
                    return (
                      <MenuItem
                        key={name}
                        value={name}
                        className="flex items-center gap-2"
                        onClick={() => setCountry(index)}
                      >
                        <img src={flags.svg} alt={name} className="h-5 w-5 rounded object-cover" />
                        {name} <span className="ml-auto">{countryCallingCode}</span>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              <Input
                size="lg"
                value={eventNumber}
                onChange={handleNumberChange}
                type="tel"
                placeholder="Телефон номер:"
                className="rounded-md rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
                containerProps={{ className: "min-w-0" }}
                error={errors.eventNumber} // Apply error to Input component
              />
            </div>
            {errors.eventNumber && <p className="text-red-500 text-xs mt-1">{errors.eventNumber}</p>}
          </div>
          <TimePicker selectedTime={selectedTime} onTimeChange={handleTimeChange} error={errors.selectedTime} />
          <Select
  id='services'
  className='text-sm'
  options={services.map(service => ({ value: service.id, label: service.name }))}
  defaultValue={selectedService} // Изменено
  onChange={selectedOption => setSelectedService(selectedOption ? selectedOption.value : '')}
  placeholder="Хизматни тангланг"
/>
          <div className="flex gap-5">
          <Radio
  name="type"
  ripple={true}
  icon={<Icon />}
  checked ={selectedType === 'booking'} // Check if selectedType matches 'booking'
  value="booking"
  onChange={handleTypeChange}
  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
  label={
    <Typography
      color="blue-gray"
      className="font-normal text-blue-gray-400"
    >
      Bron qilish
    </Typography>
  }
/>
<Radio
  name="type"
  ripple={true}
  icon={<Icon />}
  checked ={selectedType === 'planned'} // Check if selectedType matches 'planned'
  value="planned"
  onChange={handleTypeChange}
  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
  label={
    <Typography
      color="blue-gray"
      className="font-normal text-blue-gray-400"
    >
      Rejalashtirilgan
    </Typography>
  }
/>
<Radio
  name="type"
  ripple={true}
  icon={<Icon />}
  checked ={selectedType === 'technical'} // Check if selectedType matches 'technical'
  value="technical"
  onChange={handleTypeChange}
  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
  label={
    <Typography
      color="blue-gray"
      className="font-normal text-blue-gray-400"
    >
      Texnik
    </Typography>
  }
/>
    </div>
        </DialogBody>
        <DialogFooter className='flex gap-x-4'>
          <Button onClick={handleConfirmEvent}>Сақлаш</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

function TimePicker({ selectedTime, onTimeChange, error }) {
  const handleTimeChange = (event) => {
    onTimeChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
        Келиш вақти:
      </label>
      <input
        type="time"
        id="time"
        className={`mt-1 p-2.5 block w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        min="09:00"
        max="18:00"
        value={selectedTime}
        onChange={handleTimeChange}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}