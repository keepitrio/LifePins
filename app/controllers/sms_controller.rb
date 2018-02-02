class SmsController < ApplicationController
  def text
    message = TwilioTextMessenger.new(params[:message])
    transaction = msg.call(params[:phone_number])
    if transaction.account_sid
      render json: {message: "Your lifepin has been notified"}
    else
      render json: {message: "Unable to send message"}
    end
  end
end
