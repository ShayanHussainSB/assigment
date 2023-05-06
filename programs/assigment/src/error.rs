use anchor_lang::prelude::error_code;

#[error_code]
pub enum ErrorCode {
    #[msg("Subtraction Error The first number must be greater than the second number")]
    SubtractionError,

    #[msg("Division Error The second number must be greater than 0")]
    DivisionError,

    #[msg("Division Error The result must be greater than 0")]
    DivisionInvalidResult,
}
