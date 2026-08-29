import {
  ShieldCheck,
  Clock,
  Users,
  Lock,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import "./About.css";
import { useAsyncValue, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified donors",
    text: "Every donor completes an identity and health check before they can respond to a request.",
  },
  {
    icon: Clock,
    title: "Always-on requests",
    text: "Urgent blood requests reach nearby donors around the clock, not just during business hours.",
  },
  {
    icon: Users,
    title: "520+ hospital partners",
    text: "We work directly with hospitals and blood banks to confirm real, urgent need.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    text: "Your contact details stay private until you choose to respond to a request.",
  },
];

export default function About() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <section className="about">
        <div className="about-grid">
          <div>
            <span className="about-eyebrow">About LifeLink</span>
            <h2 className="about-heading">
              We built the fastest way to turn a willing donor into{" "}
              <span>a saved life.</span>
            </h2>
            <p className="about-copy">
              LifeLink connects verified blood donors with patients and
              hospitals in real time. What used to take days of phone calls now
              takes minutes — search by blood group, distance, and urgency, and
              send a request straight to someone who can help.
            </p>
            <p className="about-copy">
              Every donor is verified before they can respond, and every request
              is matched using live location data, so help arrives from someone
              nearby, not across the city.
            </p>
            <div className="about-cta">
              <button className="btn btn-primary"onClick={()=>{navigate('/home')}}>Meet the Team</button>
              <button className="btn btn-outline"onClick={()=>{navigate('/home')}}>Our Story</button>
            </div>
          </div>

          <div className="card-stage">
            <span className="deco-plus p1" aria-hidden="true"></span>
            <span className="deco-plus p2" aria-hidden="true"></span>
            <span className="deco-plus p3" aria-hidden="true"></span>
            <div className="donor-card">
              <div className="donor-card-top">
                <Droplet size={16} color="#fff" fill="#fff" />
                <span>LIFELINK</span>
              </div>
              <div className="donor-card-body">
                <div className="verified-pin">
                  <CheckCircle2 size={14} />
                  Verified
                </div>
                <p className="donor-label">Donor card</p>
                <p className="donor-name">Alex Morgan</p>
                <div className="donor-row">
                  <div>
                    <p className="donor-label" style={{ marginBottom: 2 }}>
                      Blood group
                    </p>
                    <p className="donor-id">ID: LL-2024-0451</p>
                  </div>
                  <span className="blood-badge">O+</span>
                </div>
                <div className="donor-bars" aria-hidden="true">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="values-grid">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div className="value-card" key={title}>
              <div className="value-icon">
                <Icon />
              </div>
              <h3 className="value-title">{title}</h3>
              <p className="value-text">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
