use anchor_lang::prelude::*;

use crate::{
    error::ErrorCode,
    states::{InOut, Operations},
};

#[derive(Accounts)]
pub struct InOutContext<'info> {
    ///CHECK: this is not danngerous
    pub key: AccountInfo<'info>,

    #[account(init,
    seeds = [b"inout".as_ref(), key.key().as_ref()],
    bump,
    payer = signer,
    space = InOut::LEN,
    )]
    pub inout: Box<Account<'info, InOut>>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub struct InOutArgs {
    pub input_one: i64,
    pub input_two: i64,
    pub operator: Operations,
}

pub fn inout(ctx: Context<InOutContext>, args: InOutArgs) -> Result<()> {
    let inout = &mut ctx.accounts.inout;

    inout.set_defaults();

    inout.key = ctx.accounts.key.key();
    inout.input_one = args.input_one;
    inout.input_two = args.input_two;
    inout.operator = args.operator;

    let result: i64 = match args.operator {
        Operations::Add => inout.input_one + inout.input_two,

        Operations::Sub => {
            if inout.input_one < inout.input_two {
                return Err(ErrorCode::SubtractionError.into());
            }

            inout.input_one - inout.input_two
        }

        Operations::Mul => inout.input_one * inout.input_two,

        Operations::Div => {
            if inout.input_two == 0 {
                return Err(ErrorCode::DivisionError.into());
            }

            inout.input_one / inout.input_two
        }
    };

    inout.output = result;

    Ok(())
}
