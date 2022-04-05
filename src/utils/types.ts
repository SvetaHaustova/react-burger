import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Location } from "history";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid: string;
};

export type TIngredientId = Pick<TIngredient, '_id'>;

export type TIngredientComponent = {
    ingredient: TIngredient;
    onClick: () => void;
}

export type TCardIngredientsComponent = {
    ingredients: TIngredient[];
    name: string;
}

export type TIngredientConstructorComponent = {
    ingredient: TIngredient;
    index: number;
    onDelete: (uuid: string) => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}

export type TInput = {
    name: "name" | "email" | "password" | "token";
    placeholder: string;
    type: "text" | "email" | "password";
}

export type TForm = {
    email?: string;
    password?: string;
    name?: string;
    token?: string;
}

export type TFormComponent = {
    inputs: Array<TInput>;
    form: TForm;
    icon?: keyof TICons;
    disabled?: boolean;
    title?: string;
    buttonText: string;
    passwordInput: boolean;
    reverseInput: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type TLocation = {
    from: Location;
    background?: Location;
}

export type TParams = {
    id: string;
}

export type TModalOverlayComponent = {
    onClose: () => void;
}

export type TModalComponent = {
    onClose: () => void;
    header: string;
}

export type TOrderNumber = {
    orderNumber: number;
}

export type TUser = {
    name: string;
    email: string;
}