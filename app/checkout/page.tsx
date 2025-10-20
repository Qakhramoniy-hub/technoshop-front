"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import CardImage from "@/assets/images/card.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  ChevronDownIcon,
  HandCoins,
  MapPin,
  Pen,
  Plus,
  Truck,
  X,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Iphone14Pro from "@/assets/icons/Iphone 14 pro.svg";
import Mackbook from "@/assets/images/MacBook Pro 14.png";
import Airpods from "@/assets/images/AirPods.jpg";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

// Turlarni aniqlash
interface Address {
  id: number;
  title: string;
  type: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

interface ProductTag {
  title: string;
  price: number;
  img: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  isSchedule: boolean;
  estimatedDate: string | null;
  isDefault: boolean;
}

// --- Doimiy Ma'lumotlar (Component tashqarisiga chiqarildi) ---

const PRODUCT_TAGS: ProductTag[] = [
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Iphone14Pro },
  { title: "AirPods Max Silver", price: 500, img: Mackbook },
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Airpods },
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Iphone14Pro },
  { title: "AirPods Max Silver", price: 500, img: Mackbook },
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Airpods },
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Iphone14Pro },
  { title: "AirPods Max Silver", price: 500, img: Mackbook },
  { title: "Apple IPhone 14 Pro Max 128 Gb", price: 1000, img: Airpods },
];

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 1,
    title: "2118 Thornridge",
    type: "HOME",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "(209) 555-0104",
    isDefault: true,
  },
  {
    id: 2,
    title: "Headoffice",
    type: "OFFICE",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(704) 555-0127",
    isDefault: false,
  },
];

const MOCK_PAYMENT_METHODS = [
  { id: 1, title: "Credit Card", type: "credit_card", isDefault: true },
  { id: 2, title: "PayPal", type: "paypal", isDefault: false },
  { id: 3, title: "PayPal Credit", type: "paypal_credit", isDefault: false },
];

const MOCK_SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "1",
    name: "Free",
    description: "Regular shipment",
    price: 0,
    isSchedule: false,
    estimatedDate: "Oct 17",
    isDefault: true,
  },
  {
    id: "2",
    name: "$8.50",
    description: "Get your delivery as soon as possible",
    price: 8.5,
    isSchedule: false,
    estimatedDate: "Oct 1",
    isDefault: false,
  },
  {
    id: "3",
    name: "Schedule",
    description: "Pick a date when you want to get your delivery",
    price: 0,
    isSchedule: true,
    estimatedDate: null,
    isDefault: false,
  },
];

const TAX_RATE = 50; // Mock Tax
const SMS_CODE = "123456";

// --- Component ---

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState<"step1" | "step2" | "step3">("step1");
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  // Default qiymatlarni hisoblash
  const defaultAddressId =
    addresses.find((a) => a.isDefault)?.id.toString() ||
    addresses[0]?.id.toString() ||
    "1";
  const defaultShippingId =
    MOCK_SHIPPING_OPTIONS.find((a) => a.isDefault)?.id ||
    MOCK_SHIPPING_OPTIONS[0].id;
  const defaultPaymentMethodType =
    MOCK_PAYMENT_METHODS.find((a) => a.isDefault)?.type ||
    MOCK_PAYMENT_METHODS[0].type;

  // State Boshqaruvi
  const [selectedAdress, setSelectedAddress] = useState<number>(
    Number(defaultAddressId)
  );
  const [selectedShipId, setSelectedShipId] =
    useState<string>(defaultShippingId);
  const [selectedPMethod, setSelectedPMethod] = useState<string | undefined>(
    defaultPaymentMethodType
  );
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Yangi adres qo'shish uchun state
  const [newAddressForm, setNewAddressForm] = useState({
    title: "",
    type: "",
    address: "",
    phone: "",
  });

  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  // --- CRUD Funksiyalari (Adres) ---

  const handleDeleteAddress = (id: number) => {
    setAddresses((prev) => {
      const newAddresses = prev.filter((addr) => addr.id !== id);
      // Agar o'chirilgan adres tanlangan bo'lsa, birinchi adresni tanlash
      if (selectedAdress === id && newAddresses.length > 0) {
        setSelectedAddress(newAddresses[0].id);
      } else if (newAddresses.length === 0) {
        setSelectedAddress(0); // Adres yo'q
      }
      return newAddresses;
    });
  };

  const handleOpenEditDialog = (address: Address) => {
    setEditingAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr
        )
      );
      setIsEditDialogOpen(false);
      setEditingAddress(null);
    }
  };

  // Yangi adres qo'shish (Mock)
  const handleAddNewAddress = (e: React.FormEvent, closeDialog: () => void) => {
    e.preventDefault();
    const newId = Math.max(...addresses.map((a) => a.id), 0) + 1;
    const newAddress: Address = {
      ...newAddressForm,
      id: newId,
      isDefault: false,
      type: newAddressForm.type.toUpperCase(),
    };
    setAddresses((prev) => [...prev, newAddress]);
    setNewAddressForm({ title: "", type: "", address: "", phone: "" });
    closeDialog(); // Dialogni yopish
  };

  // --- Event Handler Funksiyalari ---

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardDetails((prev) => ({ ...prev, expDate: value }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    setCardDetails((prev) => ({ ...prev, cvv: value }));
  };

  const handleConfirmOTP = () => {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    if (otp === SMS_CODE) {
      router.push("/status/success");
    } else {
      router.push("/status/rejected");
    }
  };

  const handleNextStep = () => {
    if (step === "step1") setStep("step2");
    else if (step === "step2") setStep("step3");
  };

  const handlePrevStep = () => {
    if (step === "step2") setStep("step1");
    else if (step === "step3") setStep("step2");
  };

  // --- Hisob-kitoblar (useMemo yordamida optimallashtirildi) ---
  const totals = useMemo(() => {
    const subtotal = PRODUCT_TAGS.reduce((sum, item) => sum + item.price, 0);
    const selectedShipment = MOCK_SHIPPING_OPTIONS.find(
      (s) => s.id === selectedShipId
    );
    const shippingCost = selectedShipment ? selectedShipment.price : 0;
    const total = subtotal + TAX_RATE + shippingCost;

    return {
      subtotal,
      shippingCost,
      tax: TAX_RATE,
      total,
    };
  }, [selectedShipId]);

  const selectedAddressData = useMemo(
    () => addresses.find((a) => a.id === selectedAdress),
    [selectedAdress, addresses]
  );
  const selectedShippingData = useMemo(
    () => MOCK_SHIPPING_OPTIONS.find((s) => s.id === selectedShipId),
    [selectedShipId]
  );

  // Progress bar uchun yordamchi massiv
  const steps = [
    { id: "step1", title: "Address", icon: MapPin },
    { id: "step2", title: "Shipping", icon: Truck },
    { id: "step3", title: "Payment", icon: HandCoins },
  ];

  // --- Rendering ---
  return (
    <div className="container mx-auto max-w-[1400px]">
      {/* Progress Bar (Dizayn biroz o'zgardi) */}
      <div className="flex justify-between px-4 sm:px-[100px] lg:px-[160px] py-[40px] border-b border-gray-200">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id; // Oddiy taqqoslash

          const indicatorClass = isActive
            ? "bg-indigo-600 ring-4 ring-indigo-200"
            : isCompleted
            ? "bg-gray-700"
            : "bg-gray-300 opacity-60";

          const textClass = isActive ? "text-indigo-600" : "text-gray-700";

          return (
            <div
              key={s.id}
              className={`flex items-center gap-2 ${!isActive && "opacity-75"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${indicatorClass}`}
              >
                <Icon className="stroke-white w-4 h-4" />
              </div>
              <div className="font-medium hidden sm:block">
                <h1 className="text-xs text-gray-500">Step {s.id.slice(-1)}</h1>
                <h1 className={`text-lg font-semibold ${textClass}`}>
                  {s.title}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row py-[48px] px-4 sm:px-[100px] lg:px-[160px]">
        <div className="w-full">
          {/* STEP 1: Address Selection (Dizayn o'zgardi) */}
          {step === "step1" && (
            <div className="w-full flex flex-col gap-8">
              <h1 className="font-bold text-3xl text-gray-800">
                Select Delivery Address
              </h1>

              <RadioGroup
                defaultValue={defaultAddressId}
                className="flex flex-col gap-5 w-full"
                onValueChange={(val) => setSelectedAddress(Number(val))}
              >
                {addresses.map((adr) => (
                  <div
                    key={adr.id}
                    className={`bg-white border-2 p-5 flex items-start gap-4 rounded-xl shadow-sm transition-all duration-200 ${
                      selectedAdress === adr.id
                        ? "border-indigo-600 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <RadioGroupItem
                      value={adr.id.toString()}
                      id={`option-${adr.id}`}
                      className="mt-1 border-gray-400 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600"
                    />
                    <Label
                      htmlFor={`option-${adr.id}`}
                      className="flex justify-between items-start w-full cursor-pointer"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-center">
                          <h1 className="text-xl font-bold text-gray-800">
                            {adr.title}
                          </h1>
                          <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold uppercase">
                            {adr.type}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-gray-600 text-sm">
                          <span>{adr.address}</span>
                          <span>{adr.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 opacity-75">
                        {/* Edit tugmasi */}
                        <Pen
                          width={20}
                          height={20}
                          className="cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"
                          onClick={(e) => {
                            e.preventDefault(); // Radio tugmasi bosilishini oldini oladi
                            handleOpenEditDialog(adr);
                          }}
                        />
                        {/* Delete tugmasi */}
                        <X
                          width={20}
                          height={20}
                          className="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteAddress(adr.id);
                          }}
                        />
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Add New Address Dialog */}
              {addresses.length < 5 && (
                <div className="flex justify-center mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-dashed border-gray-400 text-gray-600 hover:bg-indigo-50 hover:border-indigo-600 transition-colors"
                      >
                        <Plus width={20} height={20} />
                        Add New Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Your New Address</DialogTitle>
                        <DialogDescription>
                          Fill in the details for your new delivery location.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Yangi adres qo'shish formasi */}
                      <form
                        onSubmit={(e) => handleAddNewAddress(e, () => {})}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="new_title">Address title</Label>
                          <input
                            placeholder="Enter Address title (e.g., Home)"
                            className="px-4 py-2 w-full focus:outline-none border rounded-lg border-gray-300 focus:border-indigo-500"
                            id="new_title"
                            value={newAddressForm.title}
                            onChange={(e) =>
                              setNewAddressForm((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        {/* Boshqa inputlar shu kabi kiritiladi... */}
                        <Button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          Add Address
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}

          {/* Edit Address Dialog (Adres tahrirlash) */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Address: {editingAddress?.title}</DialogTitle>
                <DialogDescription>
                  Update the details for your selected address.
                </DialogDescription>
              </DialogHeader>
              {editingAddress && (
                <form
                  onSubmit={handleEditAddress}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit_title">Address title</Label>
                    <input
                      placeholder="Enter Address title"
                      className="px-4 py-2 w-full focus:outline-none border rounded-lg border-gray-300 focus:border-indigo-500"
                      id="edit_title"
                      value={editingAddress.title}
                      onChange={(e) =>
                        setEditingAddress((p) =>
                          p ? { ...p, title: e.target.value } : null
                        )
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="edit_type">Address Type</Label>
                    <input
                      placeholder="Enter Address Type (Home, Office)"
                      className="px-4 py-2 w-full focus:outline-none border rounded-lg border-gray-300 focus:border-indigo-500"
                      id="edit_type"
                      value={editingAddress.type}
                      onChange={(e) =>
                        setEditingAddress((p) =>
                          p
                            ? { ...p, type: e.target.value.toUpperCase() }
                            : null
                        )
                      }
                      required
                    />
                  </div>
                  {/* Qolgan inputlar */}
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save Changes
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* STEP 2: Shipping Selection (Dizayn o'zgardi) */}
          {step === "step2" && (
            <div className="w-full flex flex-col gap-6">
              <h1 className="font-bold text-3xl text-gray-800">
                Choose Shipping Method
              </h1>

              <RadioGroup
                defaultValue={defaultShippingId}
                className="flex flex-col gap-4 text-base"
                onValueChange={setSelectedShipId}
              >
                {MOCK_SHIPPING_OPTIONS.map((ship) => (
                  <div
                    key={ship.id}
                    className={`border-2 rounded-xl p-5 flex justify-between items-center transition-all duration-200 ${
                      selectedShipId === ship.id
                        ? "border-indigo-600 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem
                        value={ship.id}
                        id={`ship-${ship.id}`}
                        className="border-gray-400 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600"
                      />
                      <Label
                        htmlFor={`ship-${ship.id}`}
                        className="flex flex-col gap-1 cursor-pointer"
                      >
                        <div className="flex gap-3 items-center text-lg">
                          <h1 className="font-bold text-gray-800">
                            {ship.name}
                          </h1>
                          <span className="text-gray-500 text-sm">
                            {ship.description}
                          </span>
                        </div>
                      </Label>
                    </div>

                    {ship.isSchedule ? (
                      <Popover
                        open={scheduleOpen}
                        onOpenChange={setScheduleOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-[180px] justify-between font-medium text-gray-600 border-gray-300 hover:bg-gray-50"
                          >
                            {scheduleDate
                              ? scheduleDate.toLocaleDateString()
                              : "Select Delivery Date"}
                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 shadow-xl"
                          align="end"
                        >
                          <Calendar
                            mode="single"
                            selected={scheduleDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setScheduleDate(date);
                              setScheduleOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <h1 className="text-indigo-600 font-semibold">
                        {ship.estimatedDate}
                      </h1>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* STEP 3: Summary and Payment (Dizayn o'zgardi) */}
          {step === "step3" && (
            <div className="flex flex-col lg:flex-row gap-12 w-full">
              {/* Summary Block */}
              <div className="border border-gray-200 flex flex-col p-6 rounded-xl gap-6 shadow-md lg:w-[45%]">
                <h1 className="text-2xl font-bold text-gray-800">
                  Order Summary
                </h1>

                <ScrollArea className="h-[300px] rounded-lg border border-gray-100">
                  <div className="p-4 flex flex-col gap-4">
                    {PRODUCT_TAGS.map((tag, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex-shrink-0 relative">
                            <Image
                              src={tag.img}
                              alt={tag.title}
                              fill
                              style={{ objectFit: "contain" }}
                              className="rounded-md"
                            />
                          </div>

                          <h1 className="text-sm font-medium text-gray-700 max-w-[180px]">
                            {tag.title}
                          </h1>
                        </div>
                        <h1 className="font-bold text-gray-900">
                          ${tag.price.toFixed(2)}
                        </h1>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex flex-col gap-4 border-t pt-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm text-gray-500 font-semibold">
                      Address
                    </h1>
                    <h1 className="text-base font-semibold text-gray-800">
                      {selectedAddressData?.address || "Address not selected"}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm text-gray-500 font-semibold">
                      Shipment Method
                    </h1>
                    <h1 className="text-base font-semibold text-gray-800">
                      {selectedShippingData?.name ||
                        "Shipping method not selected"}
                    </h1>
                  </div>
                </div>

                {/* Totals Block */}
                <div className="flex flex-col gap-3 border-t pt-4">
                  <div className="flex justify-between font-semibold text-gray-700">
                    <h1 className="text-base">Subtotal</h1>
                    <h1>${totals.subtotal.toFixed(2)}</h1>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <h1>Estimated Tax</h1>
                    <h1>${totals.tax.toFixed(2)}</h1>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <h1>Estimated shipping & Handling</h1>
                    <h1>${totals.shippingCost.toFixed(2)}</h1>
                  </div>

                  <div className="flex justify-between pt-2 border-t font-bold text-lg text-gray-900">
                    <h1>Total</h1>
                    <h1>${totals.total.toFixed(2)}</h1>
                  </div>
                </div>
              </div>

              {/* Payment Block */}
              <div className="flex flex-col gap-8 lg:w-[55%]">
                <div className="flex flex-col gap-6">
                  <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
                  <div className="flex gap-8 text-sm font-semibold border-b border-gray-200">
                    {MOCK_PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPMethod(method.type)}
                        className={`pb-2 transition-colors duration-200 ${
                          selectedPMethod === method.type
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        {method.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex justify-center">
                    <Image
                      src={CardImage}
                      alt="card"
                      width={320}
                      height={160}
                      className="object-contain rounded-xl shadow-lg"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-4 font-medium">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="border focus:outline-none w-full p-4 text-sm rounded-lg border-gray-300 focus:border-indigo-500 transition-colors"
                    />

                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="Card Number (xxxx xxxx xxxx xxxx)"
                      className="border focus:outline-none w-full p-4 text-sm rounded-lg border-gray-300 focus:border-indigo-500 transition-colors"
                    />

                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={cardDetails.expDate}
                        onChange={handleExpDateChange}
                        placeholder="Exp. Date (MM/YY)"
                        className="border focus:outline-none w-full p-4 text-sm rounded-lg border-gray-300 focus:border-indigo-500 transition-colors"
                      />
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={handleCvvChange}
                        placeholder="CVV"
                        className="border focus:outline-none w-full p-4 text-sm rounded-lg border-gray-300 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-base">
                    <Checkbox
                      id="checkbx"
                      className="border-gray-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <label
                      htmlFor="checkbx"
                      className="font-medium text-gray-700"
                    >
                      Same as billing address
                    </label>
                  </div>
                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      className="px-16 py-6 text-lg border-gray-400 text-gray-600 hover:bg-gray-100"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="px-16 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                          Pay ${totals.total.toFixed(2)}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="flex flex-col items-center justify-center space-y-6 max-w-sm sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-center text-xl font-bold">
                            Enter SMS Code
                          </DialogTitle>
                          <DialogDescription className="text-center text-gray-500">
                            A 6-digit code was sent to your phone.
                          </DialogDescription>
                        </DialogHeader>

                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => {
                            setOtp(value);
                            setError("");
                          }}
                          className="w-full text-xl"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={0}
                            />
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={1}
                            />
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={2}
                            />
                          </InputOTPGroup>

                          <InputOTPSeparator />

                          <InputOTPGroup>
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={3}
                            />
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={4}
                            />
                            <InputOTPSlot
                              className="w-12 h-12 text-xl font-bold border-gray-400 focus-visible:ring-indigo-500"
                              index={5}
                            />
                          </InputOTPGroup>
                        </InputOTP>

                        {error && (
                          <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0">
                          Mock code: {SMS_CODE}
                        </p>

                        <div className="flex justify-end items-center gap-4 pt-4">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setOtp("");
                              setError("");
                            }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </Button>

                          <Button
                            onClick={handleConfirmOTP}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={otp.length !== 6}
                          >
                            Confirm
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {step !== "step3" && (
        <div className="flex justify-end items-center py-6 px-4 sm:px-[100px] lg:px-[160px] gap-6 border-t border-gray-200">
          <Button
            variant="outline"
            className="px-12 py-6 text-lg border-gray-400 text-gray-600 hover:bg-gray-100"
            onClick={handlePrevStep}
            disabled={step === "step1"}
          >
            Back
          </Button>
          <Button
            className="px-12 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleNextStep}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
export default Page;
