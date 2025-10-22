import { useCallback, useEffect, useState } from "react";
import type { Car, Brand } from "../types";

const LOCAL_STORAGE_KEY = "cars_data";

// ✅ Default dataset (mapped to internal Car type)
const DEFAULT_DATA: Car[] = [
  {
    company: "BMW",
    carId: "56975611",
    model: "530",
    year: 2017,
    volume: "3.0D",
    mileage: 170000,
    price: 26900,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355985/71196960.th2.jpg",
    title:
      "Pārdodu BMW 530D Xdrive G30 ļoti labā tehniskā un vizuālā stāvoklī.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/530/cfxcbj.html",
  },
  {
    company: "BMW",
    carId: "56807012",
    model: "X5",
    year: 2019,
    volume: "3.0D",
    mileage: 95000,
    price: 48000,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1409/352040/70407806.th2.jpg",
    title: "BMW X5 G05 X-Drive M-Sportpaket. Pilna servisa vēsture BMW dīlera.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/x5/hdfdh.html",
  },
  {
    company: "BMW",
    carId: "56975608",
    model: "320",
    year: 2013,
    volume: "2.0D",
    mileage: 231000,
    price: 10390,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355985/71196929.th2.jpg",
    title: "Jauna TA. Pārbaudāms nobraukums. Nav krāsota neviena detaļa.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/320/fejci.html",
  },
  {
    company: "BMW",
    carId: "56975553",
    model: "120",
    year: 2008,
    volume: "2.0D",
    mileage: 275000,
    price: 5600,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355984/71196634.th2.jpg",
    title: "BMW 120d kabriolets ar ļoti bagātīgu komplektāciju.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/120/fixch.html",
  },
  {
    company: "BMW",
    carId: "56606041",
    model: "320 Gran Turismo",
    year: 2017,
    volume: "2.0D",
    mileage: 196000,
    price: 14900,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/7/1388/346817/69363244.th2.jpg",
    title: "BMW 320 dA Gran Turismo xDrive. 2017. gada. 2.0l dīzelis.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/320/bkxxfj.html",
  },
  {
    company: "BMW",
    carId: "56975559",
    model: "X3",
    year: 2011,
    volume: "2.0D",
    mileage: 285000,
    price: 10550,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355984/71196666.th2.jpg",
    title:
      "Pārdodu BMW X3 2.0d, 135kw, 2011.gads, xdrive (4x4). Ļoti labā tehniskā un vizuālā stāvoklī.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/x3/cdjgpl.html",
  },
  {
    company: "BMW",
    carId: "56430542",
    model: "M5",
    year: 2018,
    volume: "4.4",
    mileage: null,
    price: 59900,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355984/71196720.th2.jpg",
    title:
      "BMW M5 F90 Individual. M Performance Package 600 ZS. M Seats. Bowers & Wilkins audio.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/m5/bcdhcx.html",
  },
  {
    company: "BMW",
    carId: "56975477",
    model: "430",
    year: 2014,
    volume: "3.0D",
    mileage: null,
    price: 14990,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355982/71196224.th2.jpg",
    title: "BMW 430D Xdrive M-Sport Package, 3.0 Dīzelis 190 kW Automāts.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/430/cbblff.html",
  },
  {
    company: "BMW",
    carId: "55692040",
    model: "530",
    year: 2008,
    volume: "3.0D",
    mileage: 300000,
    price: 6350,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1421/355003/71000458.th2.jpg",
    title:
      "Pārdod BMW 530 Xdrive Facelift, ļoti labā tehniskā un vizuālā stāvoklī.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/530/bjpjkm.html",
  },
  {
    company: "BMW",
    carId: "56975506",
    model: "535",
    year: 2010,
    volume: "3.0D",
    mileage: 198000,
    price: 14000,
    isNew: false,
    pictureUrl: "https://i.ss.lv/gallery/8/1424/355983/71196420.th2.jpg",
    title:
      "BMW 535D labā tehniskā stāvoklī, 220kW, tikko izieta TA, uzliktas ziemas riepas.",
    detailsUrl: "https://www.ss.lv/msg/lv/transport/cars/bmw/535/cggmfh.html",
  },
];

export function useCarData(initialFilter = { brand: "BMW" as Brand }) {
  const [allCars, setAllCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse localStorage cars:", e);
      }
    }
    return DEFAULT_DATA;
  });

  const [cars, setCars] = useState<Car[]>(allCars);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [filter, setFilter] = useState<any>(initialFilter);

  const saveToStorage = (data: Car[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const applyFilter = useCallback((cars: Car[], filter: any) => {
    return cars.filter((car) => {
      if (
        filter.brand &&
        filter.brand !== "Both" &&
        car.company !== filter.brand
      )
        return false;
      if (filter.model && car.model !== filter.model) return false;
      if (filter.volume && car.volume !== filter.volume) return false;
      if (filter.yearFrom && car.year < filter.yearFrom) return false;
      if (filter.yearTo && car.year > filter.yearTo) return false;
      if (filter.priceFrom && car.price < filter.priceFrom) return false;
      if (filter.priceTo && car.price > filter.priceTo) return false;
      if (
        filter.mileageFrom &&
        car.mileage !== null &&
        car.mileage < filter.mileageFrom
      )
        return false;
      if (
        filter.mileageTo &&
        car.mileage !== null &&
        car.mileage > filter.mileageTo
      )
        return false;
      if (filter.onlyNew && !car.isNew) return false;
      return true;
    });
  }, []);

  useEffect(() => {
    setCars(applyFilter(allCars, filter));
  }, [filter, allCars, applyFilter]);

  const addCar = (car: Car) => {
    setAllCars((prev) => {
      const updated = [car, ...prev];
      saveToStorage(updated);
      setCars(applyFilter(updated, filter));
      return updated;
    });
  };

  return {
    cars,
    allCars,
    loading,
    lastSync,
    filter,
    setFilter,
    addCar,
    setCars,
  };
}
