import express from "express";
import forbidden from './forbidden';
import tokenError from './tokenError';

class Responses {
    public static init() {

        express.response["forbidden"] = forbidden;
        express.response["tokenError"] = tokenError;

    }
}

export default Responses;