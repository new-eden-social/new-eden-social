import { ClassType } from 'class-transformer/ClassTransformer';
/**
 * Validate value for validator
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {Promise<T>}
 */
export declare const lynxValidate: <T>(validation: ClassType<T>, value: object) => Promise<T>;
/**
 * Validate value for validator
 * IGNORES ASYNC VALIDATORS
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {T}
 */
export declare const lynxValidateSync: <T>(validation: ClassType<T>, value: object) => T;
