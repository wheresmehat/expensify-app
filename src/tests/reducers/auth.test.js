import authReducer from "../../reducers/auth";

test("should setup auth state when logged in", () => {

    const currentState = {};
    
    const uid = "12345";
    const action = { type: "LOGIN", uid };

    const state = authReducer(currentState, action);

    expect(state).toEqual({ uid });

});

test("should setup auth state when logged out", () => {

    const currentState = { uid: "12345" };
    
    const action = { type: "LOGOUT" };

    const state = authReducer(currentState, action);

    expect(state).toEqual({ });

});