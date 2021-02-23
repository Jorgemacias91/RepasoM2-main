import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { App , addCity, removeCity, reducer} from "./App.js";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);
    });
    it("Renderiza un <form>", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Renderiza un input con la propiedad "name" igual a "city"', () => {
      expect(wrapper.find('input[name="city"]')).toHaveLength(1);
    });

    it('Renderiza un input con la propiedad "name" igual a "location"', () => {
      expect(wrapper.find('textarea[name="location"]')).toHaveLength(1);
    });

    it('Renderiza un input con la propiedad "name" igual a "temperatura"', () => {
      expect(wrapper.find('input[name="temperatura"]')).toHaveLength(1);
    });

    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
  });

  describe("Manejo de inputs con estado", () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<App />);
    });

    describe("City input", () => {
      it("El form deberia cambiar de estado cuando escriban en el input de city", () => {
        wrapper.find('input[name="city"]').simulate("change", {
          target: { name: "city", value: "Rosario" },
        });
        expect(useState).toHaveBeenCalledWith({
          city: "Rosario",
          location: "",
          temperatura: "",
        });
      });
    });

    describe("Location input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "location"', () => {
        wrapper.find('textarea[name="location"]').simulate("change", {
          target: { name: "location", value: "Alemania" },
        });
        expect(useState).toHaveBeenCalledWith({
          city: "",
          location: "Alemania",
          temperatura: "",
        });
      });
    });


    describe("Temp input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "temperatura"', () => {
        wrapper
          .find('input[name="temperatura"]')
          .simulate("change", { target: { name: "temperatura", value: "30" } });
        expect(useState).toHaveBeenCalledWith({
          city: "",
          location: "",
          temperatura: "30",
        });
      });
    });
  });
});

// ---------------------------------------------------------------------------------

describe("Funciones 'acciones'", () => {
  it('Debería retornar una action con las propiedades type "AddCity" y payload: Este contiene lo que recibe como argumento la funcion ', () => {
    const payload = { city: "Buenos Aires", location:"Argentina", temperatura:"30"};
    expect(addCity(payload)).toEqual({
      type: "AddCity",
      payload: {
        city: "Buenos Aires",
        location: "Argentina",
        temperatura: "30"
      },
    });
  });
  it('Debería retornar una action con las propiedades type "removeCity" y payload, su valor lo recibe por argumento:', () => {
    const payload = { id: 2 };
    expect(removeCity(payload)).toEqual({
      type: "RemoveCity",
      payload: {
        id: 2
      },
    });
  });
});
// ---------------------------------------------------------------------------------

describe("Reducer", () => {
  it("Deberia retornar el estado inicial", () => {
    expect(reducer(undefined, [])).toEqual({cities:[],});
  });

  it('deberia agregar una Ciudad cuando action type es "AddCity"', () => {
    const payload = {
      city: "Caracas",
      location: "Venezuela",
      temperatura:"32"
    };

    expect(reducer({}, addCity(payload))).toEqual({
      cities:[{
        city: "Caracas",
      location: "Venezuela",
      temperatura:"32",
        id: 1
      }]
    });
  });

  it("deberia agregar otra Ciudad sin mutar el state previo", () => {
    const payload = {
      city: "Santiago",
      location: "Chile",
      temperatura: "28",
    };
    const someState = {
      cities: [
        {
          city: "Lima",
          location: "Perú",
          temperatura: "25",
          id: 1,
        },
      ],
    };
    expect(reducer(someState, addCity(payload))).toEqual({
      cities: [
        {
          city: "Lima",
          location: "Perú",
          temperatura: "25",
          id: 1,
        },
        {
          city: "Santiago",
          location: "Chile",
          temperatura: "28",
          id:2
        },
      ],
    });
  });

  it('deberia sacar una Ciudad cuando action type es "RemoveCity"', () => {
    const payload = 1;
    const someState = {
      cities: [
        {
          city: "Lima",
          location: "Perú",
          temperatura: "25",
          id: 1,
        },
        {
          city: "Santiago",
          location: "Chile",
          temperatura: "28",
          id: 2,
        }
      ],
    };
    expect(reducer(someState, removeCity(payload))).toEqual({
      cities: [
        {
          city: "Santiago",
          location: "Chile",
          temperatura: "28",
          id: 2,
        }
      ],
    });
  });

});