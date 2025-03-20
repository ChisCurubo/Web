import { Router } from "express";

export default interface RoutesExpress {
router: Router;
path: string;
routes(): void;
}