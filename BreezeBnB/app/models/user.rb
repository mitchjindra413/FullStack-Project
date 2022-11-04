class User < ApplicationRecord
    require 'date'

    has_secure_password
    before_validation :ensure_session_token

    validates :first_name, :last_name, presence: true 
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :birthdate, presence: true 
    validate :validate_age
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 8 }, allow_nil: true

    def validate_age
        if birthdate.present? && birthdate > (DateTime.now - (18 * 365))
            errors.add(:birthdate, 'must be at least 18 years to sign-up')
        end
    end

    has_many :listings,
        foreign_key: :owner_id,
        class_name: :Listing,
        dependent: :destroy

    has_one_attached :photo,
        dependent: :destroy

    # TODO uncomment
    # has_many :reviews,
    #     dependent: :destroy

    has_many :reservations,
        dependent: :destroy

    has_many :trips,
        through: :reservations,
        source: :listing

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    def reset_session_token! 
        self.session_token = generate_session_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    private
    def generate_session_token 
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end
