use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq, Copy)]
pub enum Operations {
    Add,
    Sub,
    Mul,
    Div,
}

#[account]
pub struct InOut {
    pub key: Pubkey,
    pub wallet: Pubkey,
    pub input_one: i64,
    pub input_two: i64,
    pub operator: Operations,
    pub output: i64,
}
impl InOut {
    pub const LEN: usize = 8 + 96;
    pub fn set_defaults(&mut self) {
        self.key = Pubkey::default();
        self.wallet = Pubkey::default();
        self.input_one = 0;
        self.input_two = 0;
        self.operator = Operations::Add;
        self.output = 0;
    }
}
